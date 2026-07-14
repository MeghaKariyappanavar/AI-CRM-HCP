from app.database.database import SessionLocal
from app.services.interaction_update_service import (
    InteractionUpdateService
)

db = SessionLocal()

result = InteractionUpdateService.update(
    db,
    interaction_id=1,
    notes="Doctor requested a product brochure.",
    followup="Call after 3 days"
)

if result:
    print(result.id)
    print(result.notes)
    print(result.next_action)
else:
    print("Interaction not found.")