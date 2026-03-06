#author Ean Pistorius @ tomcat endeavours
from .email_service import EmailService
from app.repositories import SubscriberRepository
from fastapi import HTTPException

class SubscriberService:
    def __init__(self, repository: SubscriberRepository):
        self.repository = repository
        self.email_service = EmailService()

    async def subscribe(self, email: str, nickname: str, option: str, consent: bool):
        if not consent:
            raise Exception("Benodig toestemming. / Consent required")
        existing = self.repository.get_by_email(email)
        if existing:
            self.repository.update_subscriber(email=existing.email, nickname=nickname, option=option, consent=consent)
            raise HTTPException(
                status_code=200,
                detail="Gas databasis opgedateer. / Guest database updated.")

        subscriber = self.repository.create_subscriber(email, nickname, option, consent)
        await self.email_service.submit(email, nickname, option, consent)
        return subscriber
