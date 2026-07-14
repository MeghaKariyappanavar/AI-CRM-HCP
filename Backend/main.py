from fastapi import FastAPI

from app.database.database import Base, engine

from app.models.hcp import HCP
from app.models.interaction import Interaction

from app.api.hcp import router as hcp_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI CRM HCP Backend",
    version="1.0.0"
)

app.include_router(hcp_router)


@app.get("/")
def root():
    return {
        "message": "AI CRM Backend Running"
    }