import tweepy
from transformers import pipeline
from typing import List, Dict
import os
from dotenv import load_dotenv

load_dotenv()

class TwitterService:
    def __init__(self):
        # Initialize Twitter API client
        self.client = tweepy.Client(
            bearer_token=os.getenv('TWITTER_BEARER_TOKEN'),
            consumer_key=os.getenv('TWITTER_CONSUMER_KEY'),
            consumer_secret=os.getenv('TWITTER_CONSUMER_SECRET'),
            access_token=os.getenv('TWITTER_ACCESS_TOKEN'),
            access_token_secret=os.getenv('TWITTER_ACCESS_TOKEN_SECRET')
        )
        
        # Initialize sentiment analysis model
        self.sentiment_analyzer = pipeline(
            'sentiment-analysis',
            model='distilbert-base-uncased-finetuned-sst-2-english',
            return_all_scores=True
        )
    
    def search_tweets(self, query: str, max_results: int = 100) -> List[Dict]:
        """Search for tweets and analyze their sentiment."""
        try:
            # Search tweets
            tweets = self.client.search_recent_tweets(
                query=query,
                max_results=max_results,
                tweet_fields=['created_at', 'public_metrics']
            )
            
            if not tweets.data:
                return []
            
            analyzed_tweets = []
            for tweet in tweets.data:
                # Analyze sentiment
                sentiment = self.analyze_sentiment(tweet.text)
                
                # Create tweet object with analysis
                tweet_obj = {
                    'id': str(tweet.id),
                    'text': tweet.text,
                    'created_at': tweet.created_at.isoformat(),
                    'metrics': tweet.public_metrics,
                    'sentiment_score': sentiment['score'],
                    'sentiment_label': sentiment['label']
                }
                analyzed_tweets.append(tweet_obj)
            
            return analyzed_tweets
            
        except Exception as e:
            raise Exception(f"Error searching tweets: {str(e)}")
    
    def analyze_sentiment(self, text: str) -> Dict:
        """Analyze sentiment of a given text."""
        try:
            # Get sentiment analysis
            result = self.sentiment_analyzer(text)[0]
            
            # Get the sentiment with highest score
            sentiment = max(result, key=lambda x: x['score'])
            
            return {
                'label': sentiment['label'],
                'score': sentiment['score']
            }
            
        except Exception as e:
            raise Exception(f"Error analyzing sentiment: {str(e)}")