from sqlalchemy.orm import Session

from app.models.hcp import HCP
from app.schemas.hcp import HCPCreate


class HCPService:

    @staticmethod
    def create_hcp(
        db: Session,
        hcp: HCPCreate
    ):

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
    def get_all_hcps(
        db: Session
    ):

        return db.query(HCP).all()

    @staticmethod
    def get_hcp_by_id(
        db: Session,
        hcp_id: int
    ):

        return (
            db.query(HCP)
            .filter(HCP.id == hcp_id)
            .first()
        )

    @staticmethod
    def update_hcp(
        db: Session,
        hcp_id: int,
        hcp: HCPCreate
    ):

        existing_hcp = (
            db.query(HCP)
            .filter(HCP.id == hcp_id)
            .first()
        )

        if existing_hcp is None:
            return None

        existing_hcp.doctor_name = hcp.doctor_name
        existing_hcp.specialization = hcp.specialization
        existing_hcp.hospital = hcp.hospital
        existing_hcp.city = hcp.city
        existing_hcp.phone = hcp.phone
        existing_hcp.email = hcp.email

        db.commit()
        db.refresh(existing_hcp)

        return existing_hcp

    @staticmethod
    def delete_hcp(
        db: Session,
        hcp_id: int
    ):

        existing_hcp = (
            db.query(HCP)
            .filter(HCP.id == hcp_id)
            .first()
        )

        if existing_hcp is None:
            return False

        db.delete(existing_hcp)
        db.commit()

        return True