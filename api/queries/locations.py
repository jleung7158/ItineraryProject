from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str

class LocationIn(BaseModel):
    trip_id: Optional[int]
    name: str
    date: str
    address: str
    picture_url: Optional[str]

class LocationOut(BaseModel):
    id: int
    trip_id: Optional[int]
    name: str
    date: str
    address: str
    picture_url: Optional[str]

class LocationRepository:
    def create(self, location: LocationIn) -> LocationOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                    INSERT INTO locations
                        (name, date, address)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                        [
                            location.trip_id,
                            location.name,
                            location.date,
                            location.address,
                            location.picture_url
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.location_in_to_out(id, location)
        except Exception as e:
            print(e)
            return {"message": "Could not create location"}
  
    def get_all(self) -> Union[List[LocationOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT l.id AS location_id,
                        l.trip_id AS trip_id,
                        l.name AS locations,
                        l.date AS date,
                        l.address AS address,
                        l.picture_url AS picture,
                        t.name AS trip
                        FROM locations AS l
                        LEFT JOIN trip t
                        ON (t.id = l.trip_id)
                        ORDER BY l.date;
                        """
                    )
                    return [
                        self.record_to_location_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all locations"}

    def location_in_to_out(self, id: int, location: LocationIn):
      old_data = location.dict()
      return LocationOut(id=id, **old_data)
    
    def record_to_location_out(self, record):
        return LocationOut(
            id=record[0],
            trip_id=record[1],
            name=record[2],
            date=record[3],
            address=record[4],
            picture_url=record[5],
        )