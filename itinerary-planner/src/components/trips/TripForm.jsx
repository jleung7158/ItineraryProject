/*eslint-disable*/
import React, { useState } from "react";
import { useCreateTripMutation } from "../../store/api.js";
import { useDispatch } from "react-redux";
import { toggleTripFormOpen } from "../../slices/tripFormSlice";

export default function TripForm() {
  const [name, setName] = useState('');
  const [pic, setPic] = useState('');
  const [createTrip] = useCreateTripMutation();
  const dispatch = useDispatch();

  function handleTripSubmit(event) {
    event.preventDefault();
    createTrip({ name, pic });
    dispatch(toggleTripFormOpen());
  }

  function handleNameInput(e) {
    setName(e.target.value);
  } 

  function handlePicInput(e) {
    setPic(e.target.value);
  }

  return (
    <div>
      <form
        onSubmit={handleTripSubmit}
        className="flex flex-col items-center mx-2 p-2"
        id="trip"
      >
        <input
          label="Name"
          id="name"
          placeholder="Trip name"
          value={name}
          onChange={(e) => handleNameInput(e)}
          className="my-2 p-2 rounded text-black w-[120px]"
        />
        <input
          label="Pic"
          id="pic"
          placeholder="Trip pic url"
          value={pic}
          onChange={(e) => handlePicInput(e)}
          className="my-2 p-2 rounded text-black w-[150px]"
        />
        <button className="flex flex-col justify-center my-2 p-2 rounded items-center shadow-lg rounded-full h-8 w-8 bg-gradient-to-r from-violet-500 to-fuchsia-500">
          <img
          alt="+" 
          src="https://cdn-icons-png.flaticon.com/512/3524/3524388.png" 
          className="w-[12px]"
          /></button>
      </form>
    </div>
  )
}