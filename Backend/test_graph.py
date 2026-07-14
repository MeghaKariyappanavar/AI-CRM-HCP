from app.agents.crm_agent import crm_graph

response = crm_graph.invoke(
    {
        "message": "Show history of Dr Rahul"
    }
)

print(response)