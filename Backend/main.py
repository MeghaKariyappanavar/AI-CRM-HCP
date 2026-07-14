from fastapi import FastAPI

from app.database.database import Base, engine

from app.models.hcp import HCP
from app.models.interaction import Interaction

from app.api.hcp import router as hcp_router
from app.api.interaction import router as interaction_router
from app.api.chat import router as chat_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI CRM HCP Backend",
    version="1.0.0"
)

app.include_router(hcp_router)
app.include_router(chat_router)
app.include_router(interaction_router)



@app.get("/")
def root():
    return {
        "message": "AI CRM Backend Running"
    }