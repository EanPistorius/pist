#author Ean Pistorius @ tomcat endeavours
import time
from app.core import SessionLocal, logger
from app.repositories import EmailRepository
from app.services import EmailSender

def run():
    logger.info("email worker started")
    while True:
        db = SessionLocal()
        try:
            emails = EmailRepository.get_pending(db)
            for email in emails:
                        
                try:
                    email.retry_count += 1
                    EmailSender.send(
                        email.subscriber_email_address,
                        email.subject,
                        email.body
                    )
                    EmailRepository.mark_sent(db, email)

                    logger.info(f"email processed {email.id}")
                except Exception as e:
                    EmailRepository.mark_failed(db,
                    email,
                    str(e)
                    )
                    logger.error(f"email failed {email.id}", exc_info = True)
            db.commit()
        finally:
            db.close()
        time.sleep(5)
            