from app.agents.crm_agent import crm_graph

response = crm_graph.invoke(
    {
        "message": "Today I met Dr Rahul. We discussed CardioPlus."
    }
)

print(response)