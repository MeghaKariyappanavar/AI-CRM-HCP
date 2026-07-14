from langchain_core.tools import tool


@tool
def log_interaction(conversation: str) -> str:
    """
    Log an HCP interaction.

    This is the first AI tool.
    Later it will call Groq and save to PostgreSQL.
    """

    return f"Interaction received: {conversation}"