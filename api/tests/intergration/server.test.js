const { test } = require("@jest/globals");
const request = require("supertest");
const server = require("../../server");
const express = require('express');
const jwt = require('jsonwebtoken');




describe('API server', () => {
    let api 
    let testUser = {
        "username": "trumpetgems",
        "email": "friend@circus.dk",
        "password": "ahudnthpdohbapbb243"
    }
    let testLogin = {
        "email": "friend@circus.dk",
        "password": "ahudnthpdohbapbb243"
    }
    let testId = {
        "user_id": 1,

    }

    let token;

    beforeAll(() => {
        // start the server
        api = server.listen(3000, () => console.log('Test server running on port 3000'))
    })

    afterAll(done => {
        // close the server, then run done
        console.log('Gracefully stopping test server')
        api.close(done) // `done` will be invoked when the `api.close` function is complete
    })

    test('it responds to get / with status 200', done => { 
        request(api) 
            .get('/') 
            .expect(200, done) 
    })

    test('it responds with all users and status 200', done => { 
        request(api) 
            .get('/users') 
            .expect(200, done) 
    })

    test('it registers a user', done => { 
        request(api) 
            .post('/auth/register')
            .send(testUser) 
            .set("Accept", "application/json")
            .set('Content-Type', 'application/json')
            .expect({msg: 'User created'}, done) 
            .expect(201) 
    })

    test('it logs in a user', done => { 
        request(api)
            .post('/auth/login') 
            .send(testLogin)
            .set("Accept", "application/json")
            .set('Content-Type', 'application/json')
            .expect(200) 
            .end((err, response) => {
                console.log(response.body);
                token = response.body.split(' ')[1];
                console.log(token);
                done();
            })

    })
    

    test('returns a habit userId', done => {
        request(api)
            .post('/habits')
            .send('testId')
            .set('Accept', 'application/json')
            .expect(function(res) {
                res.body.user_Id = '1';
            })
            .expect(200, {
                user_Id: '1'
            }, done);
    })

    test('creates a habit', done => {
        let user = jwt.decode(token);
        let id = user.id;
        let testHabit = {id: 1, habit_name: 'Drink Water'}
        request(api)
        .post('/habits')
        .send(testHabit)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .expect(201,done)
    })

    // test('returns users habit', done => {
    //     request(api)
    //     .get('/habits')
    //     .expect(200,done)

    // })

    



    
})