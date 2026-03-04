from fastapi import FastAPI
from pydantic import BaseModel

from micro_goal_engine import generate_micro_tasks
from sentiment_engine import analyze_sentiment
from voice_engine import speak

app = FastAPI(title="Bro Reminder AI Engine")


class GoalRequest(BaseModel):
    goal: str
    deadline: str
    days_per_week: int
    hours_per_day: int


class SentimentRequest(BaseModel):
    text: str


class VoiceRequest(BaseModel):
    text: str


@app.get("/")
def home():
    return {"message": "Bro Reminder AI Engine Running"}


@app.post("/generate-tasks")
def create_tasks(data: GoalRequest):

    tasks = generate_micro_tasks(
        data.goal,
        data.deadline,
        data.days_per_week,
        data.hours_per_day
    )

    return {"tasks": tasks}


@app.post("/sentiment")
def sentiment(data: SentimentRequest):

    result = analyze_sentiment(data.text)

    return result


@app.post("/voice-reminder")
def voice(data: VoiceRequest):

    speak(data.text)

    return {"status": "voice reminder played"}