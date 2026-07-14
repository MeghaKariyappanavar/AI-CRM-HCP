from pydantic import BaseModel


class AIInteractionResponse(BaseModel):
    doctor_name: str
    products_discussed: str
    summary: str
    next_followup: str
    sentiment: str