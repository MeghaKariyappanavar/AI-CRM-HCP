from fastapi import APIRouter

from app.schemas.chat import ChatRequest
from app.agents.crm_agent import crm_graph

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