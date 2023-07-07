from pydantic import BaseModel
from typing import List, Optional
from queries.pool import pool
from datetime import datetime


class Error(BaseModel):
    message: str


class PlanIn(BaseModel):
    location_id: int
    detail: str
    time: datetime
    names_attendees: str
    num_of_attendees: int
    picture_url: Optional[str]


class PlanOut(BaseModel):
    id: int
    location_id: int
    detail: str
    time: datetime
    names_attendees: str
    num_of_attendees: int
    picture_url: Optional[str]


class PlanRepository:
    def create(self, plan: PlanIn) -> PlanOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO plans
                            (
                                location_id,
                                detail, time,
                                names_attendees,
                                num_of_attendees,
                                picture_url
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            plan.location_id,
                            plan.detail,
                            plan.time,
                            plan.names_attendees,
                            plan.num_of_attendees,
                            plan.picture_url
                        ],
                    )
                    result = db.fetchone()
                    if result:
                        id = result[0]
                        return PlanOut(
                            id=id,
                            **plan.dict()
                        )
                    else:
                        return Error(message="Could not create plan")

        except Exception as e:
            print(e)
            return {"message": "Could not create plan"}

    def get_all(self) -> List[PlanOut] | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            p.id AS plan_id,
                            p.location_id AS location_id,
                            p.detail AS detail,
                            p.time AS time,
                            p.names_attendees AS names,
                            p.num_of_attendees AS num_of_attendees,
                            p.picture_url AS picture,
                            l.name AS location
                        FROM plans AS p
                        LEFT JOIN locations l
                        ON (l.id = p.location_id)
                        ORDER BY p.time;
                        """
                    )
                    return [
                        self.plan_out(record)
                        for record in result
                    ]

        except Exception as e:
            print(e)
            return {"message": "Could not get all plans"}

    def get_one(self, plan_id: int) -> PlanOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                        p.id AS plan_id,
                        p.location_id AS location_id,
                        p.detail AS detail,
                        p.time AS time,
                        p.names_attendees AS names,
                        p.num_of_attendees AS num_of_attendees,
                        p.picture_url AS picture,
                        l.name AS location
                        FROM plans p
                        LEFT JOIN locations l
                        ON (l.id = p.location_id)
                        WHERE p.id = %s
                        ORDER BY p.time;
                        """,
                        [plan_id],
                    )
                    data = db.fetchone()
                    if data:
                        return PlanOut(
                            id=data[0],
                            location_id=data[1],
                            detail=data[2],
                            time=data[3],
                            names_attendees=data[4],
                            num_of_attendees=data[5],
                            picture_url=data[6]
                        )
                    else:
                        return Error(message="Could not find plan")

        except Exception as e:
            print(e)
            return {"message": "Could not retrieve plan info"}

    def delete(self, plan_id: int) -> bool | Error:
        target_plan = self.get_one(plan_id)
        if target_plan.id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            DELETE FROM plans
                            WHERE id = %s
                            """,
                            [plan_id]
                        ),
                        return True
            except Exception as e:
                print(e)
                return False

        return None

    def update(self, plan_id: int, plan: PlanIn) -> PlanOut | Error:
        target_plan = self.get_one(plan_id)
        if target_plan.id:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            UPDATE plans
                            SET
                                location_id = %s,
                                detail = %s,
                                time = %s,
                                names_attendees = %s,
                                num_of_attendees = %s,
                                picture_url = %s
                            WHERE id = %s
                            """,
                            [
                                plan.location_id,
                                plan.detail,
                                plan.time,
                                plan.names_attendees,
                                plan.num_of_attendees,
                                plan.picture_url,
                                plan_id
                            ]
                        )
                        return PlanOut(
                            id=plan_id,
                            **plan.dict()
                        )

            except Exception as e:
                print(e)
                return Error(message="Could not update plan")

        else:
            return Error(message="Plan not found")

    def plan_out(self, record):
        return PlanOut(
            id=record[0],
            location_id=record[1],
            detail=record[2],
            time=record[3],
            names_attendees=record[4],
            num_of_attendees=record[5],
            picture_url=record[6],
        )
