import { useSelector, useDispatch } from "react-redux";
import { useGetTripsQuery } from "../store/api.js";
import { setTrip, clearTrip } from "../slices/tripSlice";
import { toggleTripFormOpen } from "../slices/tripFormSlice.js";
import TripForm from "./trips/TripForm.jsx";

export default function Sidebar() {
  const dispatch = useDispatch();
  const trip = useSelector((state) => state.tripFilter.trip);
  const { data: tripsData } = useGetTripsQuery();
  const toggled = useSelector((state) => state.tripFormToggler.isOpen);

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

  function handleNewTrip () {
    dispatch(toggleTripFormOpen());
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center shadow-lg border-violet-500 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 mb-4 h-20 w-20 md:h-36 md:w-36">
          <img
          className="object-cover h-12 w-12 md:h-24 md:w-24"
          src="https://cdn-icons-png.flaticon.com/512/664/664637.png"
          />
        </div>
        <button 
        type="trip"
        className="flex flex-col justify-center items-center shadow-lg m-1 md:m-2 p-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full h-12 w-12 hover:border-4 hover:border-fuchsia-600"
        onClick={() => handleNewTrip()}
        >
          { toggled ? <img
          className="rotate-45"
          src="https://cdn-icons-png.flaticon.com/512/3524/3524388.png" 
          /> : <img 
          src="https://cdn-icons-png.flaticon.com/512/3524/3524388.png" 
          />}
        </button>
        { toggled ? (
          <div className="w-full">
            <TripForm />
          </div>
        ) : null}
        <div className="text-[10px] md:text-lg">
          {trip ? <div>{trip}</div> : <div></div>} 
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
            className="my-1 md:my-4 p-1 md:p-4 shadow-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full text-white text-2xl md:text-3xl font-bold leading-[2.5rem] hover:border-4 hover:border-fuchsia-600 hover:text-black"
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