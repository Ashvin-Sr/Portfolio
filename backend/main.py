import os
import json
import uuid
from typing import Optional
 
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from db import *
from llm import get_llm_response

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ashvinsureskumar.vercel.app", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    user_id: str

class ChatRoom(BaseModel):
    chat_room_id: str
    user: User

class ChatMessage(BaseModel):
    user: User
    content: str = Field(..., max_length=250, description="The content of the chat message.")

@app.get("/health")
def read_health():
    return {"status": "healthy"}

@app.post("/chat/new")
@limiter.limit("3/hour")
def new_session(request: Request, user: User):
    if not get_user_db(user.user_id):
        return {"error": "User not found"}
    response = create_session_db(user.user_id)
    return {"chat_room": response} if response else {"error": "Failed to create a new chat session."}

@app.post("/chat/messages/{session_id}")
@limiter.limit("5/minute")
async def chat(request: Request, chat_message: ChatMessage, session_id: str):

    user = get_user_db(chat_message.user.user_id)
    session = get_session_db(session_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    if user["requests"] >= 10:
        raise HTTPException(status_code=403, detail="User has exceeded the maximum number of messages allowed.")
    
    increment_user_count_db(chat_message.user.user_id, user["requests"])
    add_message_db(session_id, "user", chat_message.content)
    history = get_messages_db(session_id)

    async def event_stream():
        llm_text = ""
        try:
            async for chunk in get_llm_response(session_id, session["user_id"], chat_message.content):
                llm_text += chunk
                yield f"data: {json.dumps({'delta': chunk})}\n\n"
        except Exception as e:
            print(f"[event_stream error] {e}")
            yield f"data: {json.dumps({'error': 'stream_interrupted'})}\n\n"
        finally:
            if llm_text:
                add_message_db(session_id, "model", llm_text)
            yield f"data: {json.dumps({'done': True})}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")

@app.get("/chat/messages/{session_id}")
def get_messages(session_id: str):
    session = get_session_db(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    
    return {"messages": get_messages_db(session_id)}
