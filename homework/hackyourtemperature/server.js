import express from 'express';


const app = express();
const PORT = 3000;

app.get('/', (request, response) => {
  response.send('<h3> hello from backend to frontend! </h3>');
});

app.use(express.json());

app.post('/weather', (request, response) => {
  const cityName = request.body.cityName;
  response.send(cityName);
})


app.listen(PORT, console.log(`Server started on port ${PORT}`));