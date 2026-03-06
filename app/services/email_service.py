#author Ean Pistorius @ tomcat endeavours

from app.models.subscriber import Subscriber
from app.repositories import SubscriberRepository, EmailRepository

class EmailService:
    def __init__(self, sub_repo: SubscriberRepository, email_repo: EmailRepository):
        self.sub_repo = sub_repo
        self.email_repo = email_repo

    def submit(self, email, nickname, attending, consent):

        subscriber = self.sub_repo.get_by_email(email)
        
        if subscriber:
            subscriber = self.sub_repo.update(
                subscriber,
                    nickname = nickname,
                    attending = attending,
                    consent = consent
            )
        else:
            subscriber = self.sub_repo.create(
                email = email,
                nickname = nickname,
                attending = attending,
                consent = consent
            )

        if consent and attending:
            self.email_repo.create_email(
                subscriber_id = subscriber.id,
                email_to = subscriber.email,
                subject = "Pistorius troue",
                body = f"Liewe {subscriber.nickname},\n\nBaie dankie vir jou RSVP. Ons sien uit daarna om jou by die troue te sien!\n\nVriendelike groete,\nEan en Carlee\n\nLet wel dat hierdie e-pos outomaties gestuur is. Jy kan nie op hierdie e-pos antwoord nie."
            )
        elif consent and not attending:
            self.email_repo.create_email(
                subscriber_id = subscriber.id,
                email_to = subscriber.email,
                subject = "Pistorius troue",
                body = f"Liewe {subscriber.nickname},\n\nBaie dankie vir jou RSVP. Ons is jammer dat jy nie by die troue kan wees nie. Indien jy jou besluit verander, kan jy weer www.pistoriusies.co.za/trou bywoon en die RSVP form weereens invul.\n\nVriendelike groete,\nEan en Carlee\n\nLet wel dat hierdie e-pos outomaties gestuur is. Jy kan nie op hierdie e-pos antwoord nie."
            )
        return subscriber