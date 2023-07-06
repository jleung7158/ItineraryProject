from fastapi import APIRouter, Depends, Response
from queries.plans import (
    Error,
    PlanIn,
    PlanOut,
    PlanRepository
)

router = APIRouter()


@router.post("/plans", response_model=PlanOut | Error)
async def create(
    plan: PlanIn,
    response: Response,
    repo: PlanRepository = Depends(),
) -> PlanOut:
    result = repo.create(plan)
    if result is None:
        response.status_code = 404
        result = Error(message="Unable to create new plan")
    return result


@router.get("/plans", response_model=list[PlanOut] | Error)
async def get_all(
    response: Response,
    repo: PlanRepository = Depends()
):
    result = repo.get_all()
    if result is None:
        response.status_code = 404
        result = Error(message="Unable to get list of plans")
    else:
        response.status_code = 200
        return result


@router.get("/plans/{plan_id}", response_model=PlanOut | Error)
async def get_one(
    plan_id: int,
    response: Response,
    repo: PlanRepository = Depends()
):
    result = repo.get_one(plan_id)
    if result is None:
        response.status_code = 404
        result = Error(message="Invalid plan id")
    return result


@router.delete("/plans/{plan_id}", response_model=bool | Error)
async def delete(
    plan_id: int,
    response: Response,
    repo: PlanRepository = Depends(),
) -> bool | Error:
    result = repo.delete(plan_id)
    if result is None:
        response.status_code = 404
        result = Error(message="Invalid plan id")
    else:
        response.status_code = 200
        return result


@router.put("/plans/{plan_id}", response_model=PlanOut | Error)
async def update(
    plan_id: int,
    plan: PlanIn,
    response: Response,
    repo: PlanRepository = Depends()
) -> PlanOut | Error:
    result = repo.update(plan_id, plan)
    if result is None:
        response.status_code = 404
        result = Error(message="Unable to update plan")
    else:
        response.status_code = 200
        return result
