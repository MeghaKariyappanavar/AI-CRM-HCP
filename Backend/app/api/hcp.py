from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.hcp import HCPCreate, HCPResponse
from app.services.hcp_service import HCPService

router = APIRouter(
    prefix="/api/hcps",
    tags=["HCP"]
)


@router.post("/", response_model=HCPResponse)
def create_hcp(
    hcp: HCPCreate,
    db: Session = Depends(get_db)
):
    return HCPService.create_hcp(db, hcp)


@router.get("/", response_model=list[HCPResponse])
def get_all_hcps(
    db: Session = Depends(get_db)
):
    return HCPService.get_all_hcps(db)