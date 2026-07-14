from app.database.database import SessionLocal

# Import all models so SQLAlchemy knows them
from app.models.hcp import HCP
from app.models.interaction import Interaction

from app.services.interaction_ai_service import InteractionAIService


db = SessionLocal()

result = InteractionAIService.save_chat_interaction(
    db,
    """
Today I met Dr Rahul.

We discussed CardioPlus.

He requested more samples.

Follow up next week.
"""
)

print(result.id)
print(result.summary)