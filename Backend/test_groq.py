from app.ai.llm import llm

response = llm.invoke("Say Hello from Groq.")

print(response.content)