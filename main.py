from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from twitter_service import TwitterService
import uvicorn
from typing import List, Dict
from pydantic import BaseModel

app = FastAPI(title="Sentiment Analysis Dashboard", version="1.0.0")

# Initialize Twitter service
twitter_service = TwitterService()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SentimentRequest(BaseModel):
    text: str

class TweetSearchRequest(BaseModel):
    query: str
    max_results: int = 100

# Basic health check endpoint
@app.get("/")
async def root():
    return {"status": "ok", "message": "Sentiment Analysis API is running"}

@app.post("/analyze/text")
async def analyze_text(request: SentimentRequest):
    try:
        result = twitter_service.analyze_sentiment(request.text)
        return {
            "text": request.text,
            "sentiment_score": result["score"],
            "sentiment_label": result["label"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/tweets")
async def analyze_tweets(request: TweetSearchRequest):
    try:
        tweets = twitter_service.search_tweets(request.query, request.max_results)
        return {
            "query": request.query,
            "tweets": tweets
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)