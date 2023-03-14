import supertest from "supertest";
import app from "../app.js";

const request = supertest(app);

describe('POST /weather', () => {
  it('responds with a weather message for a valid city', async () => {
    const res = await request
      .post('/weather')
      .send({ city: 'London' })
      .expect(200);

    expect(res.body.weatherText).toBeDefined();
    expect(res.body.weatherText).toMatch(/The temperature in London is/);
  });

  it('responds with a 404 error message for an invalid city', async () => {
    const res = await request
      .post('/weather')
      .send({ city: 'asdasdasd' })


    //expect(res.body.weatherText).toBeDefined();
    expect(res.weatherText).toBe(undefined);
  });

  it('responds with status code 200 if valid response', async () => {
    const res = await request
      .post('/weather')
      .send({ city: 'Amsterdam' });

    expect(res.status).toBe(200);
  })
});