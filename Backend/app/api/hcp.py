from typing import List

from fastapi import APIRouter, Depends, HTTPException
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


@router.get("/", response_model=List[HCPResponse])
def get_hcps(
    db: Session = Depends(get_db)
):
    return HCPService.get_all_hcps(db)


@router.get("/{hcp_id}", response_model=HCPResponse)
def get_hcp(
    hcp_id: int,
    db: Session = Depends(get_db)
):
    hcp = HCPService.get_hcp_by_id(db, hcp_id)

    if hcp is None:
        raise HTTPException(
            status_code=404,
            detail="Healthcare Professional not found."
        )

    return hcp


@router.put("/{hcp_id}", response_model=HCPResponse)
def update_hcp(
    hcp_id: int,
    hcp: HCPCreate,
    db: Session = Depends(get_db)
):
    updated = HCPService.update_hcp(
        db,
        hcp_id,
        hcp
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Healthcare Professional not found."
        )

    return updated


@router.delete("/{hcp_id}")
def delete_hcp(
    hcp_id: int,
    db: Session = Depends(get_db)
):
    deleted = HCPService.delete_hcp(
        db,
        hcp_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Healthcare Professional not found."
        )

    return {
        "message": "Healthcare Professional deleted successfully."
    }