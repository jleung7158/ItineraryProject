import { useEffect,useState } from "react";


export default function ItineraryCard() {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    const url = `http://localhost:8000/locations`
    const response = await fetch(url);
    if (response.ok) {
      const LData = await response.json();
      setLocations(LData);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return(
    <div className="flex flex-col justify-center items-center">
      Location
      {locations?.map((location) => {
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