from fastapi import APIRouter

router = APIRouter()

@router.get("/locations")
def get_locations():
    return {"locations": ["location1"]}

@router.get("/locations/{location_id}")
def get_location(location_id):
    return {"location_id": location_id}