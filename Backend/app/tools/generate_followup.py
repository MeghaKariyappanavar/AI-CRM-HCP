from langchain_core.tools import tool

from app.services.ai_service import AIService


@tool
def generate_followup(conversation: str):
    """
    Generate the next follow-up action for an HCP interaction.
    Returns the recommended next action, follow-up date, and priority.
    """

    prompt = f"""
You are a pharmaceutical CRM assistant.

Based on the conversation below, suggest:

1. next_action
2. followup_date
3. priority (High, Medium, Low)

Return ONLY valid JSON.

Conversation:

{conversation}
"""

    return AIService.ask_llm(prompt)