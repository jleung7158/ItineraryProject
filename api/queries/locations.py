from pydantic import BaseModel
from typing import Optional

class LocationIn(BaseModel):
    name: str
    description: Optional[str]
    address: str | None = None
    picture_url: Optional[str]
    attendees: Optional[int]

class LocationOut(BaseModel):
    id: int
    name: str
    description: Optional[str]
    address: str | None = None
    picture_url: Optional[str]
    attendees: Optional[int]

class LocationRepository:
  def location_in_to_out(self, id: int, location: LocationIn):
    old_data = location.dict()
    return LocationOut(id=id, **old_data)