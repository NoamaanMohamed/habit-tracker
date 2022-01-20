const habitFacts = require('../../../models/habit_facts')
const pg = require('pg');
jest.mock('pg');

const db = require('../../../db_config/config');


describe('Habit Facts', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('findById', () => {
        test('it resolves with habit fact on successful db query', async () => {
            let habitData = { hPlanId: 1, hfactTimestamp: '2022-01-11 15:10:25-07'}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await habitFacts.findById(1);
            expect(result).toBeInstanceOf(habitFacts)
        })
    });

    describe('create', () => {
        test('it resolves with habit plan id on successful db query', async () => {
            let habitData = { hPlanId: 1, hfactTimestamp: '2022-01-11 15:10:25-07'}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await habitFacts.create('New Habit plan');
            expect(result).toBeInstanceOf(habitFacts)
        })
    });

})