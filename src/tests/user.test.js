const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /users', async () => { 
    const body = {
        firstName: 'Paolo',
        lastName: 'Neruda',
        email: 'Neruda69@gmail.com',
        password: 'neruda1234',
        phone: '12345678'
    }
    const res = await request(app).post('/users').send(body);
    id = res.body.id; 
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
 });

  test('POST /users/login', async () => { 
    const body = {
        email: 'Neruda69@gmail.com',
        password: 'neruda1234',
    }
    const res = await request(app).post('/users/login').send(body);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('GET /users', async () => {
    const res = await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token} `);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id', async () => {
    const body = { firstName: 'Paolo update'}
    const res = await request(app)
    .put(`/users/${id}`)
    .send(body)
    .set('Authorization', `Bearer ${token} `);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName); 
  });

 test('DELETE /users/:id', async () => { 
    const res = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token} `);
    expect(res.status).toBe(204);
  });
  