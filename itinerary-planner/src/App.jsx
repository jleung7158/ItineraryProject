// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'
import Sidebar from "./components/Sidebar.jsx"

function App() {

  return (
    <>
      <div className='grid grid-rows-4 grid-flow-col gap-10 h-[1150px]'>
        <div className="row-span-4 ... border-2 p-5">
          <Sidebar />
        </div>
        <div className="col-span-2 ... border-2 p-5">Test 2</div>
        <div className="row-span-2 col-span-2 ... mt-12 border-2 p-5">Test 3</div>
        <div className="row-span-4 ... border-2 p-5">
          Test 4
            <div className='p-12'>
              Itinerary Card Placeholder
            </div>
        </div>
        <div className="col-span-2 ... border-2 p-5">Test 5</div>
        <div className="row-span-2 col-span-2 ... mt-12 border-2 p-5">Test 6</div>
      </div>
    </>
  )
}

export default App
