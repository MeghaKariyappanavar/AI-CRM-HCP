from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.hcp import HCP
from app.schemas.hcp import HCPCreate, HCPResponse

router = APIRouter(
    prefix="/api/hcps",
    tags=["HCP"]
)


@router.post("/", response_model=HCPResponse)
def create_hcp(
    hcp: HCPCreate,
    db: Session = Depends(get_db)
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