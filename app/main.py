#author: Ean Pistorius @ tomcatendeavours
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from app import SubscriberRequest, SessionLocal, Base, engine
from app.services import SubscriberService
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://192.168.1.92:3000"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/subscribe")
def subscribe(data: SubscriberRequest, db: Session = Depends(get_db)):
    
    subscriber = SubscriberService.subscribe(db,
        data.email,
        data.nickname,
        data.attending,
        data.consent
    )

    return {"status": "ok", "message": "RSVP suksesvol ontvang. / RSVP successfully received."}

@app.get("/health")
def health():
    return {"status": "ok"}

