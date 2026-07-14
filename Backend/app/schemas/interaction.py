from datetime import date
from typing import List, Optional, Union

from pydantic import BaseModel, ConfigDict


class InteractionCreate(BaseModel):

    hcp_id: int

    type: str

    doctor_name: Optional[str] = None

    visit_date: Optional[date] = None

    discussion: Optional[str] = None

    products_discussed: Optional[Union[str, List[str]]] = None

    sample_given: Optional[str] = None

    followup_date: Optional[date] = None

    remarks: Optional[str] = None

    conversation: Optional[str] = None

    summary: Optional[str] = None

    next_followup: Optional[str] = None

    sentiment: Optional[str] = None


class InteractionResponse(BaseModel):

    id: int

    hcp_id: int

    doctor_name: str

    mode: str

    discussion: Optional[str] = None

    products_discussed: Optional[str] = None

    sample_given: Optional[str] = None

    followup_date: Optional[str] = None

    summary: Optional[str] = None

    notes: Optional[str] = None

    next_action: Optional[str] = None

    sentiment: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
