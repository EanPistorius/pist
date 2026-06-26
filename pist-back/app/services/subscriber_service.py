#author Ean Pistorius @ tomcat endeavours

from app.repositories import SubscriberRepository, EmailRepository
from app.core import logger
from app.models import Subscriber
from sqlalchemy.orm import Session


class SubscriberService:
       @staticmethod
       def subscribe(db: Session, email: str, nickname: str, attending: str, consent: bool) -> Subscriber:
        try:
            subscriber = SubscriberRepository.get_by_email(db, email)
            if subscriber:
                logger.info("subscriber already exists")
                subscriber.nickname = nickname
                subscriber.attending = attending
                subscriber.consent = consent
            else:
                logger.info("subscriber does not exist, creating new subscriber")
                subscriber = SubscriberRepository.create(db, email, nickname, attending, consent)
            EmailRepository.create_email_record(db, subscriber)
            db.commit()
            db.refresh(subscriber)
            logger.info("subscriber data committed")
            return subscriber
        except Exception as e:
            db.rollback()
            logger.error("Error occurred while subscribing:")
            raise e

