#author Ean Pistorius @ tomcat endeavours
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from app.core import Base
from datetime import datetime

class Subscriber(Base):
    __tablename__ = "subscriber" #kleinletters is best practice

    id = Column(Integer, primary_key = True)
    email = Column(String, unique = True, nullable = False)
    nickname = Column(String)
    attending = Column(String)
    consent = Column(Boolean, default = False)

    created_at = Column(DateTime, default = datetime.utcnow)
    updated_at = Column(DateTime, default = datetime.utcnow, onupdate = datetime.utcnow)

    emails = relationship("Email", back_populates="subscriber_email_address")