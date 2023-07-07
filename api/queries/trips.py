from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str

class TripIn(BaseModel):
    name: str
    pic: Optional[str]

class TripOut(BaseModel):
    id: int
    name: str
    pic: Optional[str]

class TripRepository:
    def create(self, trip: TripIn) -> TripOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                    INSERT INTO trips
                        (name, pic)
                    VALUES
                        (%s, %s)
                    RETURNING id;
                    """,
                        [
                            trip.name,
                            trip.pic
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.trip_in_to_out(id, trip)
        except Exception as e:
            print(e)
            return {"message": "Could not create trip"}

    def get_all(self) -> Union[List[TripOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT t.id AS trip_id,
                        t.name AS trips,
                        t.pic AS pictures
                        FROM trips AS t
                        ORDER BY t.name;
                        """
                    )
                    return [
                        self.record_to_trip_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all trips"}

    def update(
        self, trip_id: int, trip: TripIn
    ) -> Union[TripOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE trips
                        SET name = %s
                            , pic = %s
                        WHERE id = %s;
                        """,
                        [
                            trip.name,
                            trip.pic,
                            trip_id
                        ],
                    )
                    return self.trip_in_to_out(trip_id, trip)
        except Exception as e:
            print(e)
            return {"message": "Could not update trip"}
        
    def get_one(self, trip_id: int) -> Optional[TripOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT t.id AS trip_id,
                        t.name AS trips,
                        t.pic AS pictures
                        FROM trips AS t
                        WHERE t.id = %s
                        ORDER BY t.name;
                        """,
                        [trip_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_trip_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that trip"}

    def delete(self, trip_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM trips
                        WHERE ID = %s;
                        """,
                        [trip_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Could not delete trip"}        

    def trip_in_to_out(self, id: int, trip: TripIn):
        old_data = trip.dict()
        return TripOut(id=id, **old_data)
    
    def record_to_trip_out(self, record):
        return TripOut(
            id=record[0],
            name=record[1],
            pic=record[2],
        )