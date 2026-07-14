import json

from app.ai.llm import llm


class AIService:

    @staticmethod
    def extract_interaction(conversation: str):

        prompt = f"""
You are an AI assistant for a Healthcare CRM.

Extract the following fields.

Return ONLY valid JSON.

doctor_name
products_discussed
summary
next_followup
sentiment

Conversation:

{conversation}
"""

        response = llm.invoke(prompt)

        content = response.content.strip()

        # Remove markdown code fences if present
        if content.startswith("```"):
            content = content.replace("```json", "")
            content = content.replace("```", "")
            content = content.strip()

        return json.loads(content)