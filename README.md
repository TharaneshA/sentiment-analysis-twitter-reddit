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

1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with:
   ```
   TWITTER_API_KEY=your_api_key
   TWITTER_API_SECRET=your_api_secret
   TWITTER_ACCESS_TOKEN=your_access_token
   TWITTER_ACCESS_TOKEN_SECRET=your_token_secret
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Running the Application

1. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.