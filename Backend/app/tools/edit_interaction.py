from langchain_core.tools import tool


@tool
def edit_interaction(
    interaction_id: int,
    notes: str,
    followup: str
) -> dict:
    """
    Edit an existing interaction.
    """

    return {
        "interaction_id": interaction_id,
        "notes": notes,
        "followup": followup
    }