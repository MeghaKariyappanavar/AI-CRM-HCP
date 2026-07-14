from typing import TypedDict

from langgraph.graph import StateGraph, END

from app.tools.log_interaction import log_interaction


class CRMState(TypedDict):
    message: str
    result: str


def log_node(state: CRMState):

    output = log_interaction.invoke(
        {
            "conversation": state["message"]
        }
    )

    return {
        "result": output
    }


builder = StateGraph(CRMState)

builder.add_node("log_interaction", log_node)

builder.set_entry_point("log_interaction")

builder.add_edge(
    "log_interaction",
    END
)

crm_graph = builder.compile()