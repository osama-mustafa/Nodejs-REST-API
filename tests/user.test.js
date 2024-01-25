const request = require('supertest');
const app = require('../app');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNGJjYzRhMGZiYTFkNWIwNmUzZDcyYSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDYxMjU5NjIsImV4cCI6MTcwNjIxMjM2Mn0.snpyq9mMjqpYp9Px1qxLC7J1TSSkknDiZOm5VajmjtA'

describe('GET /api/v1/users', () => {
    test('return all users', async () => {
        const response = await request(app)
            .get('/api/v1/users')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.status).toBe(200);
    });
});

describe('POST /api/v1/users', () => {
    test('create new user', async () => {
        const response = await request(app)
            .post('/api/v1/users')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                username: 'newuser',
                email: 'new_user@gmail.com',
                password: 'password'
            });

        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.status).toBe(201);
        expect(response.body.data._id).toBeDefined();
    });
});