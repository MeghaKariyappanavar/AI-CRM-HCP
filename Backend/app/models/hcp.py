from sqlalchemy import Column, Integer, String

from app.database.database import Base


class HCP(Base):
    __tablename__ = "hcp"

    id = Column(Integer, primary_key=True, index=True)
    doctor_name = Column(String(100), nullable=False)
    specialization = Column(String(100))
    hospital = Column(String(100))
    city = Column(String(100))
    phone = Column(String(20))
    email = Column(String(100))