const request = require('supertest');
const app = require('../app');

test('return all products', async () => {
    const response = await request(app)
        .get('/api/v1/products')
        .set('Accept', 'application/json');
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.status).toEqual(200);
});


test('create new product', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNGJjYzRhMGZiYTFkNWIwNmUzZDcyYSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDYwMTc0OTYsImV4cCI6MTcwNjEwMzg5Nn0.5wvfN9qI-qsr0eeGp4E9jOZRX33UaS2_8-7lIICgx-8'
    const response = await request(app)
        .post('/api/v1/products')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'product 30',
            description: 'description of product 30'
        });

    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.status).toEqual(201);
    expect(response.body.data._id).toBeDefined();
})