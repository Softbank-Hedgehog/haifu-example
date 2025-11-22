# Community Demo Project

React TS + FastAPI Community Demo for Deployment Platform Testing

## How to Run

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Features
- Create posts
- View post list
- Delete posts

## API Endpoints
- GET `/posts` - Get post list
- POST `/posts` - Create post
- DELETE `/posts/{id}` - Delete post