const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const API_KEY = '71854c951bc52365f226a089ab621373';
const API_BASE_URL = 'http://api.aviationstack.com/v1';

// Enable CORS to allow cross-origin requests
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route to handle flight arrival requests
app.get('/flight-arrival', (req, res) => {
  const flightNumber = req.query.flightNumber;

  // Make the API request
  axios
    .get(`${API_BASE_URL}/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`)
    .then((response) => {
      // Extract arrival time from the response
      const flightData = response.data.data[0];
      const estimatedArrivalTime = flightData.arrival.estimated;

      // Return the arrival time as the response
      res.send({ arrivalTime: estimatedArrivalTime });
    })
    .catch((error) => {
      console.error(error);
      // Handle error cases
      res.status(500).send({ error: 'An error occurred' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});