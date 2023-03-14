import express from 'express';
import { API_KEY } from './sources/keys.js';
import fetch from 'node-fetch';


const app = express();
const PORT = 3000;

app.get('/', (request, response) => {
  response.send('<h3> hello from backend to frontend! </h3>');
});

app.use(express.json());

// app.post('/weather', (request, response) => {
//   const cityName = request.body.cityName;
//   response.send(cityName);
// });

app.post('/weather', async (req, res) => {
  const { city } = req.body;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;


  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (data.name === 'undefined') {
      res.status(404);
      res.send({ weatherText: "City is not found!" });
    } else {
      const cityName = data.name;
      const temperature = data.main.temp;
      const weatherText = `The temperature in ${cityName} is ${temperature} degrees.`;
      res.send({ weatherText });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching weather data');
  }
});


app.listen(PORT, console.log(`Server started on port ${PORT}`));