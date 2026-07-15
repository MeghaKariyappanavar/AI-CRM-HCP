from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.chat import ChatRequest
from app.agents.crm_agent import crm_graph
from app.database.database import get_db
from app.services.interaction_ai_service import InteractionAIService

router = APIRouter(
    prefix="/api/chat",
    tags=["AI Chat"]
)


@router.post("/")
def chat(request: ChatRequest):

    response = crm_graph.invoke(
        {
            "message": request.message
        }
    )

    return {
        "success": True,
        "data": response
    }


@router.post("/save")
def chat_and_save(
    request: ChatRequest,
    db: Session = Depends(get_db)
):
    interaction = InteractionAIService.save_chat_interaction(db, request.message)

    return {
        "success": True,
        "message": "AI interaction saved successfully.",
        "data": interaction
    }
