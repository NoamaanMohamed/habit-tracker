const habitPlans = require('../../../models/habit_plans')
const pg = require('pg');
jest.mock('pg');

const db = require('../../../db_config/config');


describe('Habit Plans', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with habits plans on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}]});
            const all = await habitPlans.all;
            expect(all).toHaveLength(1)
        })
    });

    describe('create', () => {
        test('it resolves with a new habit plan on successful db query', async () => {
            let habitPlanData = { id: 1, beginDate: '2022-01-10', endDate: '2099-01-01', frequency: 2, habit: 'Meditate'}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitPlanData] });
            const result = await habitPlans.create('New Habit Plan');
            expect(result).toBeInstanceOf(habitPlans)
        })
    });

    describe('update', () => {
        test('it resolves with updated habit plan on successful db query', async () => {
            let habitPlanData = { id: 1, endDate: '2024-01-01'}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitPlanData] });
            const result = await habitPlans.update('New Habit');
            expect(result.endDate).toBe('2024-01-01')
        })
    });


})
