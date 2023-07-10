import request from 'supertest';
import app from '../../app';
import {Todos} from './todo.model';

beforeAll(async ()=>{
    try {
        await Todos.drop();
    } catch (error) {}
})

let todoId = '';
// Get the list of todos
describe('GET /api/v1/todos', () => {
    it('responds with an array of todos', async () =>
      await request(app)
        .get('/api/v1/todos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty('length');
          expect(response.body).toHaveLength(0)
        }),
    );
  });



// Test to return error if todo objects is invalid
describe('POST api/v1/todos',()=>{
    test('Should return error if todo is invalid', async ()=>
        await request(app).post('/api/v1/todos')
        .send({})
        .expect('Content-Type',/json/)
        .then((response)=>{
            expect(422);
            expect(response.body).toHaveProperty('error');
        })
    );

    test('Should create todo if request body is valid', async ()=>
    await request(app).post('/api/v1/todos')
    .send({
        "content":"Slack John",
        "done":true
    })
    .expect('Content-Type',/json/)
    .then((response)=>{
        todoId = response.body._id;
        expect(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('content');
        expect(response.body).toHaveProperty('done');
    })
)
})

describe('GET api/v1/todos/id',()=>{
    test('Should return todo with specified id', async () =>
        await request(app).get(`/api/v1/todos/${todoId}`)
        .expect('Content-type',/json/)
        .then((response)=>{
            expect(response.body).toHaveProperty('_id');
            expect(response.body._id).toBe(todoId);
        })
    )

    test('Should return error if todo with specified id is not found', async () =>
    await request(app).get(`/api/v1/todos/64a9abfb1ae14fe517951b4d`)
    .expect('Content-type',/json/)
    .then((response)=>{
        expect(404);
        expect(response.body).toHaveProperty('error');
    })
)
})

describe('PUT api/v1/todos/id',()=>{
    test('Should return updated todo for specified id', async () =>
        await request(app).put(`/api/v1/todos/${todoId}`)
        .send({
            "content":'Updated yes',
            "done":true
        })
        .expect('Content-type',/json/)
        .then((response)=>{
            expect(response.body).toHaveProperty('_id');
            expect(response.body._id).toBe(todoId);
            expect(response.body.content).toBe("Updated yes")
            expect(response.body.done).toBe(true)
        })
    )

    test('Should return error if todo with specified id is not found', async () =>
    await request(app).put(`/api/v1/todos/64a9abfb1ae14fe517951b4d`)
    .send({
        "content":'Updated yes',
        "done":true
    })
    .expect('Content-type',/json/)
    .expect(404))

    test('Should return error if request body is not set return 422 error', async () =>
    await request(app).put(`/api/v1/todos/${todoId}`)
    .expect('Content-type',/json/)
    .expect(422))
})


describe('DELETE api/v1/todos/id',()=>{
    test('Should return deleted todo for specified id', async () =>
        await request(app).delete(`/api/v1/todos/${todoId}`)
        .expect('Content-type',/json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).toEqual({});
        })
    )

    test('Should return error if todo with specified id is not found', async () =>
    await request(app).delete(`/api/v1/todos/64a9abfb1ae14fe517951b4d`)
    .expect('Content-type',/json/)
    .expect(404))
})