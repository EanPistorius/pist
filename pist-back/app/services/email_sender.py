import smtplib
from email.message import EmailMessage
from app.core import logger, settings

SMTP_SERVER = settings.SMTP_HOST
SMTP_PORT = settings.SMTP_PORT
SMTP_USER = settings.SMTP_USER
SMTP_PASS = settings.SMTP_PASS

class EmailSender:
    @staticmethod
    def send(recipient: str, subject: str, body: str):

        try:
            msg = EmailMessage()
            msg["From"] = SMTP_USER
            msg["To"] = recipient
            msg["Subject"] = subject
            msg.set_content(body)

            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                #server.starttls()
                #.login(SMTP_USER, SMTP_PASS)
                server.send_message(msg)

            logger.info("email sent to {recipient}")
        except Exception as e:

            logger.error(f"email sending failed to {recipient}", exc_info=True)
            raise e