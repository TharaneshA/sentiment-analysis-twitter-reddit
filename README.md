# sentiment analysis with transformer models

A full-stack application that performs sentiment analysis on social media data from Twitter and Reddit, providing insights into public sentiment and opinions.

## Features

- Social Media Integration:
  - Twitter OAuth integration for analyzing tweets
  - Reddit API integration for analyzing Reddit posts and comments
- Real-time sentiment analysis using state-of-the-art NLP models
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
- Twitter API
- Reddit API
- Hugging Face Transformers (for sentiment analysis)

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
4. Reddit API Credentials

### Environment Setup

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

### Backend Setup

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Configure environment variables:
   Create a `.env` file in the root directory with:
   ```
   TWITTER_API_KEY=your_twitter_api_key
   TWITTER_API_SECRET=your_twitter_api_secret
   REDDIT_CLIENT_ID=your_reddit_client_id
   REDDIT_CLIENT_SECRET=your_reddit_client_secret
   DATABASE_URL=your_database_url
   ```

3. Start the backend server:
   ```bash
   uvicorn main:app --reload
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

## Model Information

This project utilizes the following Hugging Face transformer models for sentiment analysis:

- Model: [distilbert-base-uncased-finetuned-sst-2-english](https://huggingface.co/distilbert-base-uncased-finetuned-sst-2-english)
  - A lightweight and efficient model fine-tuned for sentiment analysis
  - Provides binary sentiment classification (positive/negative)
  - Achieves good balance between performance and computational efficiency

## How It Works

The app makes it super easy to understand what people are saying about any topic on social media. Here's how you can use it:

1. First, head over to `http://localhost:5173` in your web browser
2. Log in with either your Twitter or Reddit account - don't worry, we keep your data safe!
3. Once you're in, just type any keyword or topic you're interested in (like "iPhone 15" or "Taylor Swift")
4. The app will then:
   - Find trending posts and discussions about your topic from Twitter and Reddit
   - Analyze the sentiment of each post using our AI model
   - Show you easy-to-understand results with sentiment scores

### Understanding the Results

For each post or comment, you'll see:
- The original text content
- A sentiment score (ranging from 0 to 100)
  - Scores closer to 1 mean very positive sentiment
  - Scores around 50 are neutral
  - Scores closer to 0 indicate negative sentiment
- Visual indicators (like 😊 or ☹️) to make it easy to understand at a glance

### Example Use Cases

- Brand Monitoring: Track public sentiment about your product or brand
- Event Impact: See how people feel about recent events or announcements
- Competitive Analysis: Compare sentiment between different brands or products
- Trend Analysis: Monitor how public opinion changes over time

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
