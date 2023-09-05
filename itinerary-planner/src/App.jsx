// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import { useState } from 'react';
import './App.css';
import PlansModal from './components/plans/PlansModal';
import Sidebar from "./components/Sidebar.jsx"
import ItineraryCard from './components/ItineraryCard'
import LocationList from './components/LocationList';

function App() {
  const [planModal, setPlanModal] = useState(false)

  return (
    <>
      <div className='grid grid-rows-4 grid-cols-4 grid-flow-col gap-x-2 md:gap-x-10 h-full'>
        <div className="row-span-4 col-span-1 col-end-1 ... border-2 p-1 md:p-5 w-[80px] h-[500px] md:w-[180px] md:h-[870px]">
          <Sidebar />
        </div>
        <div className="row-span-2 col-span-1 ... border-2 p-1 md:p-5 w-[50px] h-[250px] md:w-[180px] md:h-[870px]">Test 2</div>
        <div className="row-span-2 col-span-1 ... mt-12 border-2 p-1 md:p-5">Test 3</div>
        <div className="row-span-4 col-span-2 ... border-2 p-1 md:p-5 flex flex-col">
          Test 4
          <ItineraryCard />
            <div className='w-auto h-auto border-2 p-1'>
              <div className="p-1 md:p-5 items-center">
                <p className='p-1 md:p-5'>Most Recent Itinerary Plans</p>
                <p className='p-1 md:p-5'>Upcoming Itinerary Plans</p>
                <button onClick={() => setPlanModal(true)}>
                  <span>+</span>
                </button>
              </div>
            </div>
        </div>
        <div className="row-span-2 col-span-1 ... border-2 p-1 md:p-5 w-[50px] h-[250px] md:w-[180px] md:h-[870px]">
          Test 5
          <LocationList />
        </div>
        <div className="row-span-2 col-span-1 ... mt-12 border-2 p-5">Test 6</div>
        {planModal && (
          <div className="modal-overlay">
            <PlansModal setPlanModal={setPlanModal} />
          </div>
        )}
      </div>
    </>
  )
}

export default App
