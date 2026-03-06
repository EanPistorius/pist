#author: Ean Pistorius @ tomcatendeavours
from fastapi import FastAPI, Depends
from app import SubscriberService, EmailService, settings, SessionLocal, Base, engine
from sqlalchemy import create_engine
from fastapi.middleware.cors import CORSMiddleware


email_service = EmailService(
    sub_service=SubscriberService(SessionLocal()),
    email_repo=EmailRepository(SessionLocal())
)

engine = create_engine(
        settings.DATABASE_URL,
        pool_pre_ping=True
        )

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/subscribe")
def subscribe(data: SubscriberService):
    

    result = email_service.submit(
        email=data.email,
        nickname=data.nickname,
        attending=data.attending,
        consent=data.consent
    )
    return {"status": "ok"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.on_event("startup")
def startup_event():
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)