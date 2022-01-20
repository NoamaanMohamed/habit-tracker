const User = require('../../../models/user');
const pg = require('pg');
jest.mock('pg');
const db = require('../../../db_config/config');



describe('User', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with users on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await User.all;
            expect(all).toHaveLength(3)
        })
    });

    describe('create', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { username: 'New User', email: 'newuser@gmail.com', passwordDigest: 'pass'}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ userData] });
            const result = await User.create('New User');
            expect(result).toBeInstanceOf(User)
        })
    });

    describe('findByEmail', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { username: 'Test User', email: 'newuser@gmail.com', passwordDigest: 'pass' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ userData] });
            const result = await User.findByEmail('newuser@gmail.com');
            expect(result).toBeInstanceOf(User)
        })
    });

    describe('findById', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { id: 1, username: 'Test User', email: 'newuser@gmail.com', passwordDigest: 'pass' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ userData] });
            const result = await User.findById(1);
            expect(result).toBeInstanceOf(User)
        })
    });
})