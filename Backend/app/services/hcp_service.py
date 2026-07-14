from sqlalchemy.orm import Session

from app.models.hcp import HCP
from app.schemas.hcp import HCPCreate


class HCPService:

    @staticmethod
    def create_hcp(db: Session, hcp: HCPCreate):

        new_hcp = HCP(
            doctor_name=hcp.doctor_name,
            specialization=hcp.specialization,
            hospital=hcp.hospital,
            city=hcp.city,
            phone=hcp.phone,
            email=hcp.email
        )

        db.add(new_hcp)
        db.commit()
        db.refresh(new_hcp)

        return new_hcp

    @staticmethod
    def get_all_hcps(db: Session):
        return db.query(HCP).all()