from pydantic import BaseModel

class TwitterOAuthConfig:
    # Twitter API v2 OAuth 2.0 configuration
    CLIENT_ID = "N914S6108L1WPbuCz9JLhsSV1"
    CLIENT_SECRET = "29cDe3DmXRm7YVZKW5jzi788zH88k77jYD3izJ0TWcbntQeeFC"
    REDIRECT_URI = "http://localhost:5173/callback"  # Redirect URI for the frontend application
    SCOPE = [
        "tweet.read",
        "users.read",
        "tweet.write",
        "offline.access"
    ]

class TwitterUserInfo(BaseModel):
    id: str
    name: str
    username: str