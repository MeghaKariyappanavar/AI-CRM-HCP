from langgraph.graph import StateGraph
from langgraph.graph import END


from app.agents.state import CRMState

from app.tools.log_interaction import log_interaction
from app.tools.search_hcp import search_hcp


def detect_intent(state: CRMState):

    message = state["message"].lower()

    if "history" in message or "search" in message:
        return {
            "intent": "search_hcp"
        }

    return {
        "intent": "log_interaction"
    }


def execute_tool(state: CRMState):

    if state["intent"] == "search_hcp":

        result = search_hcp.invoke(
            {
                "query": state["message"]
            }
        )

    else:

        result = log_interaction.invoke(
            {
                "conversation": state["message"]
            }
        )

    return {
        "result": result
    }

builder = StateGraph(CRMState)

builder.add_node(
    "DetectIntent",
    detect_intent
)

builder.add_node(
    "ExecuteTool",
    execute_tool
)

builder.set_entry_point(
    "DetectIntent"
)

builder.add_edge(
    "DetectIntent",
    "ExecuteTool"
)

builder.add_edge(
    "ExecuteTool",
    END
)

crm_graph = builder.compile()