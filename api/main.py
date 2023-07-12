from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import (
    trips,
    locations,
    plans
)


app = FastAPI()
app.include_router(trips.router)
app.include_router(locations.router)
app.include_router(plans.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/items/{item_id}")
async def read_item(item_id):
    return {"item_id": item_id}
