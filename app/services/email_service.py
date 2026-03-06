#author Ean Pistorius @ tomcat endeavours

from app import EmailRepository, SubscriberRepository, logger
class EmailService:



    def submit(self, subscriber: SubscriberRepository):
        try:
            logger.info("stig epos rekord")
            EmailRepository.create_email(subscriber.email)
            logger.info("epos rekord gestig")
        except Exception:
            logger.exception("Error occurred while submitting email for recipient: %s", recipient)
            raise
        return subscriber