const request = require("supertest");
const server = require("./server");

  
describe('GET /', () => {
    it('returns JSON object', async () => {
        const res = await request(server).get('/')

        expect(res.body).toEqual({"message": "Lets get Started!!"})
    })
    it('returns status 200', async () => {
        const res = await request(server).get('/')

        expect(res.status).toBe(200)
    })

}) 
describe('registration', () => {
    // it('return 201 on success', async () => {
    //   const response = await request(server).post('/api/auth/register').send({ username: 'adminn', password: 'test' });
    //   expect(response.status).toBe(201);
    // });
  
    it('return 500 when there is a duplicate username', async () => {
      await request(server).post('/api/auth/register').send({ username: 'me', password: 'test' });
      const response = await request(server).post('/api/auth/register').send({ username: 'me', password: 'test' });
      expect(response.status).toBe(500);
    });
  });

describe('log in', () => {
        it('returns 200 on success', async () => {
          await request(server)
          .post('/api/auth/register')
          .send({
               username: 'me', 
               password: 'test' 
            });
          const response = await request(server).post('/api/auth/login').send({ username: 'me', password: 'test' });
          expect(response.status).toBe(200);
        });

 }) 

 describe('server', () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
})


   