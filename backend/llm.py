import os
import json
import uuid
import asyncio
from google import genai
from google.genai import types
from typing import Optional
 
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from db import *

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
MODEL = os.environ.get("GEMINI_MODEL", "gemini-3.5-flash")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BIO_PATH = os.path.join(BASE_DIR, "bio.md")

try:
    with open(BIO_PATH, "r", encoding="utf-8") as f:
        SYSTEM_PROMPT = f.read()
except FileNotFoundError:
    SYSTEM_PROMPT = "You are a helpful assistant."

client = genai.Client(api_key=GEMINI_API_KEY)

async def get_llm_response(session_id: str, user_id: str, message: str):

    canned_response = (
        "Hi! I'm a placeholder response standing in for Claude. "
        "Once you swap in the real API call, this text will be replaced "
        "with an actual generated reply."
    )

    history = get_messages_db(session_id)
    contents = [
        {
            "role": "model" if msg["role"] == "model" else "user",
            "parts": [{"text": msg["content"]}],
        }
        for msg in history
    ]

    stream = await client.aio.models.generate_content_stream(
        model=MODEL,
        contents=contents,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            max_output_tokens=512,
        )
    )

    async for chunk in stream:
        if chunk.text:
            yield chunk.text