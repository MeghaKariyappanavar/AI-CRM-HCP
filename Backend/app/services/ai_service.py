import json

from app.ai.llm import llm


class AIService:

    @staticmethod
    def ask_llm(prompt: str):

        response = llm.invoke(prompt)

        content = response.content.strip()

        if content.startswith("```"):
            content = content.replace("```json", "")
            content = content.replace("```", "")
            content = content.strip()

        try:
            return json.loads(content)
        except Exception:
            return content

    @staticmethod
    def extract_interaction(conversation: str):

        prompt = f"""
You are an AI assistant for a Healthcare CRM.

Extract:

doctor_name
products_discussed
summary
next_followup
sentiment

Return ONLY valid JSON.

Conversation:

{conversation}
"""

        return AIService.ask_llm(prompt)