from langchain_core.tools import tool
from app.ai.llm import llm


@tool
def log_interaction(conversation: str) -> str:
    """
    Extract structured information from an HCP conversation.
    """

    prompt = f"""
You are an AI assistant for a Healthcare CRM.

Extract the following information from the conversation.

Return ONLY valid JSON.

Fields:

doctor_name
products_discussed
summary
next_followup
sentiment

Conversation:

{conversation}
"""

    response = llm.invoke(prompt)

    return response.content