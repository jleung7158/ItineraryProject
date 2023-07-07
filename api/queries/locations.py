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
    pic: Optional[str]

class LocationOut(BaseModel):
    id: int
    trip_id: Optional[int]
    name: str
    date: str
    address: str
    pic: Optional[str]

class LocationRepository:
    def create(self, location: LocationIn) -> LocationOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                    INSERT INTO locations
                        (trip_id, name, date, address, pic)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                        [
                            location.trip_id,
                            location.name,
                            location.date,
                            location.address,
                            location.pic
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
                        l.pic AS picture,
                        t.name AS trip
                        FROM locations AS l
                        LEFT JOIN trips t
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

    def update(
        self, location_id: int, location: LocationIn
    ) -> Union[LocationOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE locations
                        SET trip_id = %s
                            , name = %s
                            , date = %s
                            , address = %s
                            , pic = %s
                        WHERE id = %s;
                        """,
                        [
                            location.trip_id,
                            location.name,
                            location.date,
                            location.address,
                            location.pic,
                            location_id
                        ],
                    )
                    return self.location_in_to_out(location_id, location)
        except Exception as e:
            print(e)
            return {"message": "Could not update location"}

    def get_one(self, location_id: int) -> Optional[LocationOut]:
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
                        l.pic AS picture,
                        t.name AS trip
                        FROM locations AS l
                        LEFT JOIN trips t
                        ON (t.id = l.trip_id)
                        WHERE l.id = %s
                        ORDER BY l.date;
                        """,
                        [location_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_location_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that location"}

    def delete(self, location_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM locations
                        WHERE ID = %s;
                        """,
                        [location_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Could not delete location"}

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
            pic=record[5],
        )