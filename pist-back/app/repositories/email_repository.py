#author Ean Pistorius @ tomcat endeavours

from sqlalchemy.orm import Session
from app.models import Email, Subscriber
from app.core import logger



class EmailRepository:
#Reworkable logic
    @staticmethod
    def get_pending(db: Session):
        return db.query(Email).filter(
            (Email.status == "queued") | ((Email.status == "failed") & (Email.retry_count < 3))
        )
    @staticmethod
    def mark_sent(db: Session, email: Email):
        email.status = "sent"

    @staticmethod
    def mark_failed(db: Session, email: Email, error: str):
        email.status = "failed"
        email.error = error

    def create_email_record(db: Session, recipient: Subscriber):
        nobody = f"Liewe {recipient.nickname},\n\nBaie dankie vir jou RSVP. Ons is jammer dat jy nie by die troue kan wees nie. Indien jy jou besluit verander, kan jy weer www.trou/pistoriusies.co.za bywoon en die RSVP form weereens invul.\n\nVriendelike groete,\nEan en Carlee\n\nLet wel dat hierdie e-pos outomaties gestuur is. Jy kan nie op hierdie e-pos antwoord nie."
        yesbody = f"Liewe {recipient.nickname},\n\nBaie dankie vir jou RSVP. Ons sien uit daarna om jou by die troue te sien!\n\nVriendelike groete,\nEan en Carlee\n\nLet wel dat hierdie e-pos outomaties gestuur is. Jy kan nie op hierdie e-pos antwoord nie."
        subject = "Pistorius troue"

        email = Email(subscriber_id = recipient.id,
                        #recipient_email = recipient.email, -- recipient_email is nie nodig nie, want ons kan dit kry via die subscriber_id en relationship
                        subject = subject,
                        body = yesbody if recipient.attending else nobody)
        db.add(email)

        return email