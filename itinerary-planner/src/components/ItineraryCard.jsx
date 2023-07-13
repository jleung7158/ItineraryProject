import { useSelector } from "react-redux";
import { useGetLocationsQuery } from "../store/api";

export default function ItineraryCard() {
  const trip = useSelector((state) => state.tripFilter.trip);
  const { data: lData } = useGetLocationsQuery();
  
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
  
  const filteredLocations = getFilteredLocations(trip, lData);

  return(
    <div className="flex flex-col justify-center items-center">
      {trip}
      {filteredLocations?.map((location) => {
        return (
          <div 
          key={location.id} 
          className="p-12 w-full h-full"
          >
            <img src={location.pic} className="rounded-xl h-[250px] w-[400px] my-8"/>
            {location.name}
          </div>
        )
      }
        )}
    </div>
  )
}