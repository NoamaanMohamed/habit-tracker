async function getAllUserHabits(){
    try {
        const options = {
            headers: {
                'authorization': localStorage.getItem('token'),
                'Content-Type': "application/json"
            }
        }
        
        let url = new URL('https://whispering-lowlands-57408.herokuapp.com/habitplans');
        url.searchParams.append('date',document.querySelector('.inputHabitsDate').value);
        console.log(url)
        const response = await fetch(url, options);
        const data = await response.json();
        if(data.err){
            console.warn(data.err);
            logout();
        }
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function getAllHabits(){
    try {
        const options = {
            headers: {
                'authorization': localStorage.getItem('token'),
                'Content-Type': "application/json"
            }
        }
        console.log(options)
        const response = await fetch('https://whispering-lowlands-57408.herokuapp.com/habits', options);
        const data = await response.json();
        if(data.err){
            console.warn(data.err);
            logout();
        }
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function postNewHabit(e){
    e.preventDefault();
    try {
        const habitData = {
            user_id: localStorage.userID,
            habit_id: document.querySelector('.inputHabitName').value,
            begin_date: document.querySelector('.inputStartHabit').value,
            end_date: "9999-12-31",
            frequency: document.querySelector('.inputFreqHabit').value
        };
        console.log("post data", habitData );
        const options = {
            method: 'POST',
            body: JSON.stringify(habitData),
            headers: {
                'authorization': localStorage.getItem('token'),
                'Content-Type': "application/json"
            }
        }
        console.log(options)
        const response = await fetch('https://whispering-lowlands-57408.herokuapp.com/habitplans', options);
        const data = await response.json();
        if(data.err){
            console.warn(data.err);
            logout();
        }
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function postHabitFact(e){
    e.preventDefault();
    // hplan_id = ;
    console.log(e.target)
    try {
        const factData = {
            habit_id: e.target.getAttribute('data-id'),
            };
        console.log("post fact", factData );
        const options = {
            method: 'POST',
            body: JSON.stringify(factData),
            headers: {
                'authorization': localStorage.getItem('token'),
                'Content-Type': "application/json"
            }
        };
        let url = new URL('https://whispering-lowlands-57408.herokuapp.com/habitfacts');
        url.searchParams.append('date',document.querySelector('.inputHabitsDate').value);
        console.log(options)
        
        const response = await fetch(url, options);
        const data = await response.json();
        if(data.err){
            console.warn(data.err);
            logout();
        };
        return data;
    } catch (err) {
        console.warn(err);
    };
};

async function getHabitFacts(hplan_id){
    try {
        const options = {
            headers: {
                'authorization': localStorage.getItem('token'),
                'Content-Type': "application/json"
            }
        }
        
        let url = new URL(`https://whispering-lowlands-57408.herokuapp.com/habitfacts/${hplan_id}`);
        url.searchParams.append('date',document.querySelector('.inputHabitsDate').value);
        console.log(url)
        const response = await fetch(url, options);
        const data = await response.json();
        if(data.err){
            console.warn(data.err);
            logout();
        }
        return data;
    } catch (err) {
        console.warn(err);
    }
}