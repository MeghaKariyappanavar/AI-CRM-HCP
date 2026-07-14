from pydantic import BaseModel, EmailStr
from typing import Optional


class HCPCreate(BaseModel):
    doctor_name: str
    specialization: Optional[str] = None
    hospital: Optional[str] = None
    city: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None


class HCPResponse(HCPCreate):
    id: int

    class Config:
        from_attributes = True