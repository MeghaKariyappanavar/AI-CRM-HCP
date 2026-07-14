from langchain_core.tools import tool


@tool
def search_hcp(query: str) -> str:
    """
    Search for an HCP by doctor name.
    Later this will query PostgreSQL.
    """

    return f"Searching HCP: {query}"