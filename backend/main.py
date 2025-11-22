from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uuid
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Post(BaseModel):
    id: str
    title: str
    content: str
    created_at: str

class PostCreate(BaseModel):
    title: str
    content: str

posts_db: List[Post] = []

@app.get("/")
def read_root():
    return {"message": "Community API"}

@app.get("/posts", response_model=List[Post])
def get_posts():
    return posts_db

@app.post("/posts", response_model=Post)
def create_post(post: PostCreate):
    new_post = Post(
        id=str(uuid.uuid4()),
        title=post.title,
        content=post.content,
        created_at=datetime.now().isoformat()
    )
    posts_db.append(new_post)
    return new_post

@app.delete("/posts/{post_id}")
def delete_post(post_id: str):
    global posts_db
    posts_db = [post for post in posts_db if post.id != post_id]
    return {"message": "Deleted"}