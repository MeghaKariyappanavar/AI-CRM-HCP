from app.tools.generate_followup import generate_followup

response = generate_followup.invoke(
    {
        "conversation":
        """
        Today I met Dr Rahul.

        We discussed CardioPlus.

        He requested more samples.

        Follow up next week.
        """
    }
)

print(response)