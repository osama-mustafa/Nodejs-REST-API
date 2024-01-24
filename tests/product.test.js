const request = require('supertest');
const app = require('../app');
const { HTTP_STATUS } = require('../utils/httpCodes')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNGJjYzRhMGZiYTFkNWIwNmUzZDcyYSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDYwMTc0OTYsImV4cCI6MTcwNjEwMzg5Nn0.5wvfN9qI-qsr0eeGp4E9jOZRX33UaS2_8-7lIICgx-8'



test('return all products', async () => {
    const response = await request(app)
        .get('/api/v1/products')
        .set('Accept', 'application/json');
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.status).toEqual(200);
});

test('create new product', async () => {
    const response = await request(app)
        .post('/api/v1/products')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'product 90',
            description: 'description of product 90'
        });

    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.status).toEqual(HTTP_STATUS.CREATED);
    expect(response.body.data._id).toBeDefined();
});

test('update existing product', async () => {
    const response = await request(app)
        .put('/api/v1/products/5f4bcc4a0fba1d5b06e3dc11')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'updated name',
            description: 'updated description for the product'
        });
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.status).toEqual(HTTP_STATUS.OK);
    expect(response.body.data.description).toEqual('updated description for the product');
});

test('get product', async () => {
    const response = await request(app)
        .get('/api/v1/products/5f4bcc4a0fba1d5b06e3dc11')
        .set('Accept', 'application/json')

    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.status).toEqual(HTTP_STATUS.OK);
    console.log(response.body.data, "response.body.data")
    expect(response.body.data._id).toBe('5f4bcc4a0fba1d5b06e3dc11')
});