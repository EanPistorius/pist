#author Ean Pistorius @ tomcat endeavours

from pydantic import BaseModel, EmailStr, Field

class SubscriberRequest(BaseModel):
    email: EmailStr = Field(..., example="john.doe@example.com")
    nickname: str = Field(..., example="John Doe")
    attending: str = Field(..., example='yes')
    consent: bool = Field(..., example=True)

class SubscriberResponse(BaseModel):
    id: int
    email: EmailStr
    nickname: str
    attending: str
    consent: bool

    class Config:
        from_attributes = True