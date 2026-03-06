#author Ean Pistorius @ tomcat endeavours

from app import Emails

class EmailRepository:
    def __init__(self, db):
        self.db = db
        
    def create_email(self, subscriber_id: int, email_to: str, subject: str, body: str):
        email = Emails(
            subscriber_id = subscriber_id,
            email_to = email_to,
            subject = subject,
            body = body,
            status = "queued"
        )
        self.db.add(email)
        self.db.commit()
        self.db.refresh(email)
        return email