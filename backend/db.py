import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def create_session_db(user_id: str):
    response = supabase.table("sessions").insert({"user_id": user_id}).execute()
    return response.data[0] if response.data else None

def get_session_db(session_id: str):
    response = supabase.table("sessions").select("*").eq("session_id", session_id).limit(1).execute()
    return response.data[0] if response.data else None

def add_message_db(session_id: str, role: str, message: str):
    response = supabase.table("messages").insert({"session_id": session_id, "role": role, "content": message}).execute()
    return response.data[0] if response.data else None

def get_messages_db(session_id: str):
    response = supabase.table("messages").select("content, role").eq("session_id", session_id).order("created_at", desc=False).execute()
    return response.data if response.data else []

def get_user_db(user_id: str):
    response = supabase.table("users").select("*").ilike("user_id", user_id).limit(1).execute()
    return response.data[0] if response.data else None

def increment_user_count_db(user_id: str, requestsCount: int):
    user = get_user_db(user_id)
    if user:
        response = supabase.table("users").update({"requests": requestsCount + 1}).ilike("user_id", user_id).execute()
        return response.data[0] if response.data else None
    return None