from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.locations import (
    Error,
    LocationIn,
    LocationOut,
    LocationRepository
)

router = APIRouter()

@router.post("/locations", response_model=Union[LocationOut, Error])
def create_location(
    location: LocationIn,
    repo: LocationRepository = Depends(),
):
    return repo.create(location)


@router.get("/locations", response_model=List[LocationOut])
def get_all_locations(
    repo: LocationRepository = Depends(),
):
    return repo.get_all()


@router.put(
    "/locations/{location_id}", response_model=Union[LocationOut, Error]
)
def update_location(
    location_id: int,
    location: LocationIn,
    repo: LocationRepository = Depends(),
) -> Union[LocationOut, Error]:
    return repo.update(location_id, location)


@router.delete("/locations/{location_id}", response_model=bool)
def delete_location(
    location_id: int,
    repo: LocationRepository = Depends(),
) -> bool:
    return repo.delete(location_id)


@router.get("/locations/{location_id}", response_model=Optional[LocationOut])
def get_one_location(
    location_id: int,
    response: Response,
    repo: LocationRepository = Depends(),
) -> LocationOut:
    location = repo.get_one(location_id)
    if location is None:
        response.status_code = 404
    return location