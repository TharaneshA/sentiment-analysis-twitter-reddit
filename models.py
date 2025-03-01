from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    analyses = relationship("Analysis", back_populates="user")

class Analysis(Base):
    __tablename__ = "analyses"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    query = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="analyses")
    tweets = relationship("Tweet", back_populates="analysis")

class Tweet(Base):
    __tablename__ = "tweets"
    id = Column(Integer, primary_key=True, index=True)
    tweet_id = Column(String, unique=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analyses.id"))
    text = Column(String)
    created_at = Column(DateTime)
    sentiment_score = Column(Float)
    sentiment_label = Column(String)
    analysis = relationship("Analysis", back_populates="tweets")

# Pydantic models for request/response
class UserBase(BaseModel):
    email: str
    username: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class TweetBase(BaseModel):
    tweet_id: str
    text: str
    created_at: datetime
    sentiment_score: float
    sentiment_label: str

class TweetResponse(TweetBase):
    id: int
    analysis_id: int

    class Config:
        from_attributes = True

class AnalysisBase(BaseModel):
    query: str

class AnalysisResponse(AnalysisBase):
    id: int
    user_id: int
    created_at: datetime
    tweets: List[TweetResponse] = []

    class Config:
        from_attributes = True

# Create all tables
from database import engine
Base.metadata.create_all(bind=engine)