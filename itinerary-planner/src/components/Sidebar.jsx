// import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetTripsQuery } from "../store/api.js";
import { setTrip, clearTrip } from "../slices/tripSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const trip = useSelector((state) => state.tripFilter.trip);
  const { data: tripsData } = useGetTripsQuery();
  // const [trips, setTrips] = useState([]);

  // const fetchTrips = async () => {
  //   const url = `http://localhost:8000/trips`;
  //   const response = await fetch(url);
  //   if (response.ok) {
  //     const TData = await response.json();
  //     setTrips(TData);
  //   }
  // };

  function tripAcronyms (trip) {
    let acronym = trip.name.replace(/\B\w+/g, "");
    return acronym;
  }

  function handleTrip (trip) {
    dispatch(setTrip(trip.name));
  }

  function handleClearTrip () {
    dispatch(clearTrip());
  }

  // useEffect(() => {
  //   fetchTrips();
  // }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center shadow-lg border-violet-500 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-4 h-36 w-36">
          <img
          className="object-cover h-24 w-24"
          src="https://cdn-icons-png.flaticon.com/512/664/664637.png"
          />
        </div>
        <button 
        className="flex flex-col justify-center items-center shadow-lg m-4 p-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full h-12 w-12 hover:border-4 hover:border-fuchsia-600">
          <img 
          src="https://cdn-icons-png.flaticon.com/512/3524/3524388.png" 
          />
        </button>
        <div>
          Selected Trip: {trip ? <div>{trip}</div> : <div></div>} 
        </div>
        {tripsData?.map((trip) => {
          {trip.name}
          return (
            <button 
            onClick={() => {
              handleTrip(trip);
            }}
            style={{
              backgroundImage: `url(${trip.pic})`,
              backgroundSize: 'cover',
            }}
            key={trip.id}
            className="my-4 p-4 shadow-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full text-white text-3xl font-bold leading-[2.5rem] hover:border-4 hover:border-fuchsia-600 hover:text-black"
            >
              {tripAcronyms(trip)}
            </button>
          )
        })}
        <button 
        onClick={() => {
          handleClearTrip();
        }}>
          Clear
        </button>
      </div>
    </div>
  )
}