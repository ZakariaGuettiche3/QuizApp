from dotenv import load_dotenv
from langchain_core.messages import HumanMessage
from langchain_fireworks import ChatFireworks
from langgraph.prebuilt import create_react_agent
import json

load_dotenv()
def generate_questions(topic: str):

    model = ChatFireworks(model="accounts/fireworks/models/llama4-maverick-instruct-basic")
    tool=[]
    agent = create_react_agent(model,tool)

    prompt = f"""You are an expert  challenge creator. 
    Your task is to generate a 10  question about **{topic}** with four choice answers.
    The question should be from easy to hard.

    - **Easy questions**: Focus on fundamental or introductory aspects of the topic, such as basic concepts, simple use cases, or common patterns.
    - **Medium questions**: Cover intermediate knowledge like practical applications, typical challenges, or more detailed subtopics within {topic}.
    - **Hard questions**: Explore advanced concepts, edge cases, optimization strategies, or complex scenarios that require deeper understanding of {topic}.

    Return the challenge in the following JSON structure:
    {{
        "title": "The question title",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correct_answer_id":  'Index of the correct answer (0-3)'
        "explanation": "Detailed explanation of why the correct answer is right"
    }}

   **Requirements**:
   - The options must be plausible, but only one should be clearly correct.
   - The correct answer should not always be the first option.
   - Return **only** a JSON array containing the 10 questions — with **no additional text** before or after.

    """
    full_response = ""
    for response in agent.stream(
            {"messages": [HumanMessage(content=prompt)]}
        ):
       for msg in response['agent']['messages']:
        full_response += msg.content

    return json.loads(full_response)
