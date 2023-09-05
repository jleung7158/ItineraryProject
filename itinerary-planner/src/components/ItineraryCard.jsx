import { useSelector } from "react-redux";
import { useGetLocationsQuery } from "../store/api";

export default function ItineraryCard() {
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
  
  const filteredLocations = getFilteredLocations(trip, lData);

  return(
    <div className="flex flex-col justify-center items-center">
      {filteredLocations?.map((location) => {
        return (
          <div 
          key={location.id} 
          className="p-4 w-[120px] h-[80px] md:h-[250px] md:w-[400px] rounded-xl md:text-end md:align-text-top"
          style={{
            backgroundImage: `url(${location.pic})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          >
            <div className="md:font-bold text-[10px] md:text-sm md:text-xl">
              {location.name}
            </div>
          </div>
        )
      }
        )}
    </div>
  )
}