# Sentiment Analysis Web Application

A full-stack web application that performs sentiment analysis on Twitter data, featuring a React frontend and Python FastAPI backend.

## Features

- Twitter OAuth integration for user authentication
- Real-time sentiment analysis of tweets
- Interactive web interface built with React
- RESTful API powered by FastAPI
- Database integration for storing analysis results

## Tech Stack

### Frontend
- React
- Vite (Build tool)
- Modern JavaScript (ES6+)

### Backend
- Python 3.10+
- FastAPI
- SQLAlchemy (Database ORM)
- Twitter API integration

## Project Structure

```
├── frontend/           # React frontend application
│   ├── src/           # Source code
│   ├── components/    # React components
│   └── pages/        # Page components
├── auth.py           # Authentication logic
├── database.py       # Database configuration
├── main.py           # FastAPI application entry point
├── models.py         # Database models
├── twitter_service.py # Twitter API integration
└── requirements.txt   # Python dependencies
```

## Setup Instructions

### Prerequisites

1. Python 3.10 or higher
2. Node.js and npm
3. Twitter Developer Account and API Keys

### Backend Setup
