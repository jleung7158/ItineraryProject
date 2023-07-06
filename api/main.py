from fastapi import FastAPI
from routers import (
    locations,
    plans
)


app = FastAPI()
app.include_router(locations.router)
app.include_router(plans.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/items/{item_id}")
async def read_item(item_id):
    return {"item_id": item_id}
