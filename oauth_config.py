from pydantic import BaseModel

class GoogleOAuthConfig:
    CLIENT_ID = "your-google-client-id"
    CLIENT_SECRET = "your-google-client-secret"
    REDIRECT_URI = "http://localhost:8000/auth/google/callback"
    SCOPE = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ]

class GoogleUserInfo(BaseModel):
    email: str
    name: str
    picture: str
    email_verified: bool