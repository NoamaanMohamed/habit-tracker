const form = document.querySelector('#new_user');
form.addEventListener('submit', requestRegistration);

async function requestLogin(e){
    e.preventDefault();
    try {
        const loginData = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        };
    
        const options = { 
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: { "Content-Type": "application/json" }
        };
    
        const r = await fetch(`https://whispering-lowlands-57408.herokuapp.com/auth/login`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err); }
        login(data.token);
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        const registerData = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        };
    
        const options = { 
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: { "Content-Type": "application/json" }
        };
        const r = await fetch(`https://whispering-lowlands-57408.herokuapp.com/auth/register`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}

function login(data){
    const user = jwt_decode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("userEmail", user.email);

//    location.hash =;
}

// function logout(){
//     localStorage.clear();
//     location.hash = ;
// }

// function currentUser(){
//     const username = localStorage.getItem('username')
//     return username;
// }


