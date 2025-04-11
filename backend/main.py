from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load dummy data
with open("dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)

@app.get("/api/data")
def get_data():
    """
    Returns dummy data (e.g., list of users).
    """
    return DUMMY_DATA

@app.get("/api/sales-reps")
def get_sales_reps(region: str = '', name: str = '', role: str = ''):
    sales_reps = DUMMY_DATA.get('salesReps')
    rs = sales_reps
    if(name):
        rs = [x for x in rs if name in x.get('name').lower()]
    if(role):
        rs = [x for x in rs if role in x.get('role').lower()]
    if(region):
        rs = [x for x in rs if x.get('region') == region]

    return rs

@app.post("/api/ai")
async def ai_endpoint(request: Request):
    """
    Accepts a user question and returns a placeholder AI response.
    (Optionally integrate a real AI model or external service here.)
    """
    body = await request.json()
    user_question = body.get("question", "")
    
    # Placeholder logic: echo the question or generate a simple response
    # Replace with real AI logic as desired (e.g., call to an LLM).
    return {"answer": f"This is a placeholder answer to your question: {user_question}"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
