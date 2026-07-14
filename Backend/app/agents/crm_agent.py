from langgraph.graph import StateGraph
from langgraph.graph import END

from app.agents.state import CRMState

from app.tools.log_interaction import log_interaction


def detect_intent(state: CRMState):

    message = state["message"]

    if "meeting" in message.lower():

        return {
            "intent": "log_interaction"
        }

    return {
        "intent": "log_interaction"
    }


def execute_tool(state: CRMState):

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