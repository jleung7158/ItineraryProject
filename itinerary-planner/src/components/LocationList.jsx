import { useSelector } from "react-redux";
import { useGetLocationsQuery } from "../store/api"


export default function LocationList() {
  const trip = useSelector((state) => state.tripFilter.trip);
  const { data: lData } = useGetLocationsQuery();

  /*eslint-disable*/
  function getFilteredLocations (trip, lData) {
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
  function getLocationDates (locations) {
    const l = locations ?? [];
    let dates = []
    for (let location of l) {
      let date = location.date;
      if (!dates.includes(date)) {
        dates.push(date)
      }
    }
    return dates
  }

  const dates = getLocationDates(filteredLocations);

  return (
    <div>
      <div>
        Location List
      </div>
      <div className="flex flex-col">
        {dates?.map((date) => {
          return (
            <div key={date}>
              <div>
                {date}
              </div>
              {filteredLocations?.map((location) => {
                if (location.date == date) {
                  return (
                    <div key={location.id}>
                      <button 
                      style={{
                        backgroundImage: `url(${location.pic})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      className="my-2 py-2 px-4 shadow-lg text-sm w-full min-w-[115px]"
                      >
                        <div className="flex flex-col">
                          <div>
                            {location.name}
                          </div>
                        </div>
                      </button>
                    </div>
                  )
                }
              })}
            </div>
          )})
        }
      </div>
    </div>
  )
}