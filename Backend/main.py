from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

from app.models.hcp import HCP
from app.models.interaction import Interaction

from app.api.hcp import router as hcp_router
from app.api.interaction import router as interaction_router
from app.api.chat import router as chat_router
from app.api.dashboard import router as dashboard_router

app = FastAPI(
    title="AI CRM HCP Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(hcp_router)
app.include_router(chat_router)
app.include_router(interaction_router)
app.include_router(dashboard_router)

@app.get("/")
def root():
    return {
        "message": "AI CRM Backend Running"
    }