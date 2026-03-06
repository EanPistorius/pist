#author Ean Pistorius @ tomcat endeavours
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, DateTime, Text
from app.core import Base
from datetime import datetime

class Email(Base):
    __tablename__ = "email" #kleinletters is best practice

    id = Column(Integer, primary_key = True)

    subscriber_id = Column(Integer, ForeignKey("subscriber.id")) #foreign key naar subscriber tabel
    email = Column(String, unique = True, nullable = False)
    subject = Column(String)
    body = Column(String)

    status = Column(String, default = "queued") #queued, sending, sent, failed

    created_at = Column(DateTime, default = datetime.utcnow)
    sent_at = Column(DateTime, nullable = True)

    error = Column(Text, nullable = True)