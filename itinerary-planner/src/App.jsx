// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'
import Sidebar from "./components/Sidebar.jsx"
import ItineraryCard from './components/ItineraryCard'

function App() {

  return (
    <>
      <div className='grid grid-rows-4 grid-cols-4 grid-flow-col gap-x-10 h-full'>
        <div className="row-span-4 col-span-1 col-end-1 ... border-2 p-5 w-[180px] h-[870px]">
          <Sidebar />
        </div>
        <div className="row-span-2 col-span-1 ... border-2 p-5">Test 2</div>
        <div className="row-span-2 col-span-1 ... mt-12 border-2 p-5">Test 3</div>
        <div className="row-span-4 col-span-2 ... border-2 p-5">
          Test 4
          <ItineraryCard />
        </div>
        <div className="row-span-2 col-span-1 ... border-2 p-5">Test 5</div>
        <div className="row-span-2 col-span-1 ... mt-12 border-2 p-5">Test 6</div>
      </div>
    </>
  )
}

export default App
