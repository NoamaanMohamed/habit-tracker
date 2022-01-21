const db = require('../db_config/config');


const Habit_Plan = require('./habit_plans');


module.exports =  class Habit_Facts{
    constructor(data){
        this.id=data.id;
        this.plan_id=data.hplan_id;
        this.hfactTimestamp=data.hfact_timestamp;
        // this.hPlanId={id: data.id, path: `habitplans}`}
    }
    static findByID(hplan_id, date){
        console.log('get fact', hplan_id, date)
        return new Promise (async (resolve, reject) => {
            
            try {
            // let count = await db.query(`SELECT count(*) FROM habit_facts WHERE hplan_id = $1 AND DATE(hfact_timestamp) = $2;`[hPlanId, hfact_timestamp]); resolve(count);
                let count = await db.query(`SELECT count(*) FROM habit_facts WHERE hplan_id = $1 AND DATE(hfact_timestamp) = $2;`[hplan_id, date]); 
                if (count.length > 0) {
                    resolve(count);
                }  
                console.log(count)
                 
            }  
            catch (err) {
                reject('habit not found');
            }
        });   

    }

    static create(hplan_id, date){
        return new Promise (async (resolve, reject) =>{
            try{
                console.log("post fact for", hplan_id, date)
                const newDate = new Date(date);
                const newDateS = new Date(newDate).toISOString().slice(0, 19).replace('T', ' ');
                console.log(newDateS);
                // let habitplans = await Habit_Plan.findById(hplan_id);
                // let result = await db.query(`INSERT INTO habit_facts(hplan_id,hfact_timestamp) VALUES ($1,CURRENT_TIMESTAMP);`,[habitplans.id]); resolve (result.rows[0]);
                // let result = await db.query(`INSERT INTO habit_facts(hplan_id, hfact_timestamp) VALUES ($1,CURRENT_TIMESTAMP) RETURNING *;`,[ hplan_id ]); 
                let result = await db.query(`INSERT INTO habit_facts(hplan_id, hfact_timestamp) VALUES ($1,$2) RETURNING *;`,[ hplan_id, newDateS ]); 
                console.log(result)
                resolve (result.rows[0]);
            } catch (err) {
              reject('Habit fact could not be created');


            }
        })
    }
}


// module.exports = Habit_Facts;

