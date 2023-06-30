from fastapi import APIRouter

router = APIRouter()

@router.get("/locations")
def get_locations():
    return {"locations": ["location1"]}