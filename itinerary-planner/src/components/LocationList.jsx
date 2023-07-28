import { useSelector } from "react-redux";
import { useGetLocationsQuery } from "../store/api"


export default function LocationList() {
  const trip = useSelector((state) => state.tripFilter.trip);
  const { data: lData } = useGetLocationsQuery();

  /*eslint-disable*/
  const getFilteredLocations = (trip, lData) => {
    if (!trip) {
      return null;
    } else {
      return lData?.filter((location) => {
        for (const [key,value] of Object.entries([location])) {
          if (location.trip.includes(trip)) {
            return location.trip.includes(trip)
          }
        }
      });
    }
  };

  const filteredLocations = getFilteredLocations(trip, lData)

  return (
    <div>
      <div>
        Location List
      </div>
      <div className="flex flex-col">
        {filteredLocations?.map((location) => {
          return (
            <div>
              <div className="flex flex-col">
                <div className="font-bold">{location.date}</div>
              </div>
              <button 
              key={location.id}
              style={{
                backgroundImage: `url(${location.pic})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="my-4 p-4 shadow-lg font-bold w-full min-w-fit"
              >
                {location.name}
              </button>
            </div>
            )
        })}
      </div>
      
    </div>
  )
}