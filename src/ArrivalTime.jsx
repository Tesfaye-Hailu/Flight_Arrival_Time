import React, { useState } from 'react';

const ArrivalTime = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFlightNumberChange = (e) => {
    setFlightNumber(e.target.value);
  };

  const fetchArrivalTime = () => {
    setLoading(true);

    // Make the request to the server
    fetch(`http://localhost:3000/flight-arrival?flightNumber=${flightNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setArrivalTime(data.arrivalTime);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Flight Arrival Time</h2>
      <div>
        <label htmlFor="flightNumber">Enter Flight Number:</label>
        <input
          type="text"
          id="flightNumber"
          value={flightNumber}
          onChange={handleFlightNumberChange}
        />
      </div>
      <button onClick={fetchArrivalTime}>Get Arrival Time</button>
      {loading && <p>Loading...</p>}
      {arrivalTime && <p>Estimated Arrival Time: {arrivalTime}</p>}
    </div>
  );
};

export default ArrivalTime;