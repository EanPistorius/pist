#author Ean Pistorius @ tomcat endeavours

from sqlalchemy.orm import Session  
from app.models import Subscriber


class SubscriberRepository:
    @staticmethod
    def get_by_email(db: Session, email: str):
        return db.query(Subscriber).filter(Subscriber.email == email).first()

    def create(db: Session, email: str, nickname: str, attending: str, consent: bool):
        subscriber = Subscriber(
                email = email,
                nickname = nickname,
                attending = attending,
                consent = consent
                )
    
        db.add(subscriber)
        return subscriber

