#author Ean Pistorius @ tomcat endeavours

from sqlalchemy.orm import Session  
from app import Subscriber

class SubscriberRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str):
        return self.db.query(Subscriber).filter(Subscriber.email == email).first()

    def create_subscriber(self, email: str, nickname: str, consent: bool, option: str):
        subscriber = Subscriber(
                email = email,
                nickname = nickname,
                consent = consent,
                option = option
                )
    
        self.db.add(subscriber)
        self.db.commit()
        self.db.refresh(subscriber)
        return subscriber
    def update_subscriber(self, subscriber: Subscriber):
        self.db.add(subscriber)
        self.db.commit()
        self.db.refresh(subscriber)
        return subscriber
