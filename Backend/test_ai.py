from app.services.ai_service import AIService

response = AIService.extract_interaction(
    """
Today I met Dr Rahul.

We discussed CardioPlus.

He requested more samples.

Follow up next week.
"""
)

print(response)
print(type(response))