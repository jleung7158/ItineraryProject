import PropTypes from 'prop-types';
import './plans.css';
import { useEffect, useState } from 'react';

function PlansModal({ setPlanModal }) {
    const [plan, setPlan] = useState('');
    const handlePlanChange = (e) => {
        setPlan(e.target.value);
    }

    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState('');
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    }

    const [time, setTime] = useState('')
    const handleTimeChange = (e) => {
        setTime(e.target.value);
    }

    const [attendees, setAttendees] = useState('');
    const handleAttendeeChange = (e) => {
        setAttendees(e.target.value);
    }

    const [numOfAttendees, setNumOfAttendees] = useState('');
    const handleNumChange = (e) => {
        setNumOfAttendees(e.target.value);
    }

    const [picture, setPicture] = useState('');
    const handlePictureChange = (e) => {
        setPicture(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.plan = plan;
        data.location_id = location;
        data.time = time;
        data.names_attendees = attendees;
        data.num_of_attendees = numOfAttendees;
        data.picture_url = picture

        const plansUrl = 'http://localhost:8000/plans'
        const plansFetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const planResponse = await fetch(plansUrl, plansFetchConfig);
        if (planResponse.ok) {
            setPlan('');
            setLocation('');
            setAttendees('');
            setTime('');
            setNumOfAttendees('');
            setPicture('');

            setPlanModal(false);
        }

    }

    const fetchLocationData = async () => {
        const locationUrl = 'http://localhost:8000/locations';
        const response = await fetch(locationUrl);
        if (response.ok) {
            const data = await response.json();
            setLocations(data);
        }
    }

    useEffect(() => {
        fetchLocationData();

        const interval = setInterval(() => {
            const now = new Date();
            const currentTime = now.toTimeString().slice(0, 5);
            setTime(currentTime);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className='bg-gray-500 transition duration-150 ease-in-out z-10 relative top-0 right-0 bottom-0 left-0 w-[50%] h-[55%] rounded-lg'>
            <div className='plans-button'>
                <button
                    onClick={() => {
                        setPlanModal(false);
                    }}>
                    x
                </button>
            </div>
            <div className='plans-txt'>
                <form
                    onSubmit={handleSubmit}
                    className='container mx-auto w-11/12 md:w-2/3 max-w-auto rounded-lg'
                >
                <div className='relative py-8 px-5 md:px-10 bg-transparent rounded'>
                    <h1 className='text-black font-lg font-bold tracking-normal leading-tight mb-4'>
                        Add Plans
                    </h1>
                    <div className="flex flex-col">
                        <div className="container grid grid-cols-2 gap-4">
                            <div className='left-section'>
                                <label htmlFor="location" className='text-black-900 text-2xl font-bold leading-tight tracking-normal mr-3'>Location:</label>
                                <select
                                    id="location"
                                    className='text-black focus:outline-none focus:border focus:border-grey-700 font-normal w-full h-12 flex items-center pl-3 text-xl rounded border mt-3'
                                    value={location}
                                    onChange={handleLocationChange}
                                >
                                    <option value="">Select a location</option>
                                    {locations?.map(location => {
                                        return (
                                            <option value={location.id} key={location.id}>{location.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='right-section'>
                                <label htmlFor='picture' className='text-black-900 text-2xl font-bold leading-tight tracking-normal mr-3'>Time:</label>
                                <input
                                    id="picture"
                                    className='text-black focus:outline-none focus:border focus:border-grey-700 font-normal w-full h-12 flex items-center pl-3 text-xl rounded border mt-3'
                                    type="file"
                                    defaultValue={picture}
                                    onChange={handlePictureChange}
                                />
                            </div>
                        </div>
                        <br />
                        <div>
                            <label htmlFor='plan' className='text-black-900 text-2xl font-bold leading-tight tracking-normal mr-3'>Plan:</label>
                            <textarea
                                id="plan"
                                className='text-black focus:outline-none focus:border focus:border-grey-700 font-normal w-full h-35 flex items-center pl-3 text-xl rounded border mt-3'
                                placeholder="Tell us about your plan!"
                                value={plan}
                                onChange={handlePlanChange}
                            />
                        </div>
                        <br />
                        <div className="container grid grid-cols-3 gap-4">
                            <div className='section'>
                                <label htmlFor="attendees" className='text-black-900 text-2xl font-bold leading-tight tracking-normal mr-3'>Attendees:</label>
                                <textarea
                                    id="attendees"
                                    className='text-black focus:outline-none focus:border focus:border-grey-700 font-normal w-full h-12 flex items-center pl-3 text-xl rounded border mt-3'
                                    placeholder='James L, Brandon J, etc.'
                                    value={attendees}
                                    onChange={handleAttendeeChange}
                                />
                            </div>
                            <div className='section'>
                                <label htmlFor='numOfAttendees' className='text-black-900 text-2xl font-bold leading-tight tracking-normal mr-3'>No. of Attendees:</label>
                                <input
                                    id="numOfAttendees"
                                    className='text-black focus:outline-none focus:border focus:border-grey-700 font-normal w-full h-12 flex items-center pl-3 text-xl rounded border mt-3'
                                    type='number'
                                    placeholder='5, 10, 15, 20'
                                    value={numOfAttendees}
                                    onChange={handleNumChange}
                                />
                            </div>
                            <div className='section'>
                                <label htmlFor='time' className='text-black-900 text-2xl font-bold leading-tight tracking-normal mr-3'>Time:</label>
                                <input
                                    id="time"
                                    className='text-black focus:outline-none focus:border focus:border-grey-700 font-normal w-full h-12 flex items-center pl-3 text-xl rounded border mt-3'
                                    type="time"
                                    defaultValue={time}
                                    onChange={handleTimeChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-6">
                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition duration-150 ease-in-out hover:bg-blue-600 bg-blue-700 rounded text-white px-8 py-2 text-2xl">Submit</button>
                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 ml-3 bg-red-500 transition duration-150 text-white-600 ease-in-out hover:border-red-400 hover:bg-red-300 border rounded px-8 py-2 text-2xl" onClick={() => setPlanModal(false)}>Cancel</button>
                </div>
                </form>
            </div>
        </div>
    )
}

PlansModal.propTypes = {
    setPlanModal: PropTypes.bool.isRequired,
};

export default PlansModal;
