#author Ean Pistorius @ tomcat endeavours
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Text
from sqlalchemy.orm import relationship
from app.core import Base
from datetime import datetime

class Email(Base):
    __tablename__ = "email" #kleinletters is best practice

    id = Column(Integer, primary_key = True)
    subscriber_id = Column(Integer, ForeignKey("subscriber.id")) #foreign key naar subscriber tabel
    subject = Column(String)
    body = Column(String)
    status = Column(String, default = "queued") #queued, sending, sent, failed

    created_at = Column(DateTime, default = datetime.utcnow)
    sent_at = Column(DateTime, nullable = True)
    error = Column(Text, nullable = True)
    retry_count = Column(Integer, default = 0)

    subscriber_email_address = relationship("Subscriber", back_populates="emails")