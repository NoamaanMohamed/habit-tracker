const db = require('../db_config/config');

const Habit = require('./habit');
const User = require('./user');

class Habit_Plan {
    constructor(data,habit){
        this.id = data.id;
        this.beginDate =  data.begin_date;
        this.endDate =  data.end_date;
        this.frequency = data.frequency;

        //this.user = {id: data.id, path: `users/${data.user_id}`}
        // ginger replace
        // this.habit = {id: data.id, path: `habits/${data.habit_id}`}
        // ginger there is not need habit.id
        // this.habit = {habit_name: data.habit_name, path: `habits/${data.habit_id}`}
        this.habit = data.habit_name;
        this.count = data.habit_count;
    }

    // ginger remove get - static get all(user), add query parameter date
    static all(date, user ){
        return new Promise (async (resolve, reject) => {
            console.log("param.date",date)
            try {
                // ginger replace
                // let habitData = await db.query(`SELECT habits.habit_name, habit_plans.begin_date, habit_plans.end_date, habit_plans.frequency 
                //                                 FROM habits
                //                                 INNER JOIN habit_plans
                //                                 ON habit_plans.habit_id = habits.id
                //                                 WHERE habit_plans.user_id = $1;`,[id]);
                console.log("user", user.email);
                // let habitData = await db.query(`SELECT habits.habit_name, habit_plans.begin_date, habit_plans.end_date, habit_plans.frequency, habit_plans.user_id, habits.id as habit_id, habit_plans.id as id
                //                                 FROM habit_plans
                //                                 INNER JOIN habits
                //                                 ON habit_plans.habit_id = habits.id
                //                                 INNER JOIN users
                //                                 ON habit_plans.user_id = users.id
                //                                 WHERE users.email= $1;`,[user.email]);


                // SELECT habits.habit_name, habit_plans.begin_date, habit_plans.end_date, habit_plans.frequency, habit_plans.user_id, habits.id as habit_id, habit_plans.id as id
//                                                 FROM habit_plans
//                                                 INNER JOIN habits
//                                                 ON habit_plans.habit_id = habits.id
//                                                 INNER JOIN users
//                                                 ON habit_plans.user_id = users.id

//                                                 WHERE users.email= $1
//                                                 AND
//                                                 habit_plans.begin_date <= $2
//                                                 AND
//                                                 habit_plans.end_date >= $2;`,[user.email, date]);

                let habitData = await db.query(`SELECT habits.habit_name, habit_plans.begin_date, habit_plans.end_date,
                                                habit_plans.frequency, habit_plans.user_id,
                                                habits.id as habit_id, habit_plans.id as id,
                                                    (SELECT COUNT(*) habit_count
                                                    FROM habit_facts
                                                    WHERE habit_facts.hplan_id = habit_plans.id
                                                    AND DATE(habit_facts.hfact_timestamp) = $1 )
                                                FROM habit_plans
                                                INNER JOIN habits
                                                ON habit_plans.habit_id = habits.id
                                                INNER JOIN users
                                                ON habit_plans.user_id = users.id
                                                WHERE users.email= $2
                                                AND
                                                habit_plans.begin_date <= $1
                                                AND
                                                habit_plans.end_date >= $1;`,[date, user.email]);
                
                // console.log("db: ",habitData )
                

                let habits = habitData.rows.map(b => new Habit_Plan(b));
                resolve (habits);
            } catch (err) {
                reject('habit not found');
            }
        });
    };

    static findById(id,habitDates){
        return new Promise (async (resolve, reject) => {
            try {

                const {start_date,end_date} = habitDates  
                console.log(id, start_date, end_date)
                let result = await db.query(`SELECT DATE(hfact_timestamp), count(*) AS streak_count
                                                FROM habit_facts
                                                WHERE hplan_id = $1
                                                AND DATE(hfact_timestamp) BETWEEN $2 AND $3
                                                GROUP BY DATE(hfact_timestamp)
                                                ORDER BY DATE(hfact_timestamp);`, [ id, start_date,end_date ]);
     
                console.log(result.rows)
                resolve(result.rows);
            } catch (err) {
                reject('habit not found');
            };
        });
    };

    static create(habitData){
        return new Promise (async (resolve, reject) => {
            try {

                const {user_id,habit_id,begin_date,end_date,frequency} = habitData;
                console.log("Create",user_id,habit_id,begin_date,end_date,frequency)
                // let user = await User.findById(user_id);
                // let habit = await Habit.findById(habit_id);
                // let result = await db.query(`INSERT INTO habit_plans
                //     (user_id, habit_id, begin_date, end_date, frequency)
                //     VALUES ($1, $2, $3, $4, $5)
                //     RETURNING id;`, [ user.id,habit.id,begin_date,end_date,frequency]); 
                let result = await db.query(`INSERT INTO habit_plans
                    (user_id, habit_id, begin_date, end_date, frequency)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *;`, [ user_id,habit_id,begin_date,end_date,frequency]); 
                
                resolve (result.rows[0]);

            } catch (err) {
                reject('habit could not be created');
            }
        });
    };

    static update(habitData){
        return new Promise (async (resolve, reject) =>{
            try{
               
                const {end_date, id} = habitData
               
                let result = await db.query(`UPDATE habit_plans 
                                             SET end_date = $1
                                             WHERE id = $2;`, [end_date,id]); resolve (result.rows[0]);
                                             console.log("done")
            }catch(err){
                reject('Update failed')
            }
        })
    }
}

module.exports = Habit_Plan;


