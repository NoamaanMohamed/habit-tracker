const nav = document.querySelector('nav');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const body = document.querySelector('body');

let togle = true;
let path = '#';


// const publicRoutes = ['#login', '#register'];
const privateRoutes = ['#dashboard', '#streak'];

window.addEventListener('hashchange', updateContent);

document.addEventListener("click", function (e) {
    if (e.target && e.target.className == 'switch-button-checkbox') {
        if (togle === true) {
            renderRegisterForm();
            togle = false
        } else {
            renderLoginForm();
            togle = true;
        }
    }
})

function updateMain(path) {
    main.innerHTML = '';
    nav.innerHTML = '';
    footer.innerHTML = '';
    body.classList.remove('pattern');
    
    console.log("updateMain",path)
    if (path) {
        switch(path){
            case '#':
                renderHomepage(); break;
            case '#dashboard':
                renderMain(); break;
            // case '#streak':
            //     renderStreak(); break;
            default:
                // render404(); break;
                renderHomepage(); break;
        }
    } else {
        console.log("render homepage")
        renderHomepage();
    }
}

function updateContent(){
    const path = window.location.hash;
    console.log("updateContent ",path)
    console.log("currentUser",currentUser())
    if (privateRoutes.includes(path) && !currentUser()){
        window.location.hash = '#';
        console.log("updateContent change hash", window.location.hash)
        updateMain(path)
    } else if (!privateRoutes.includes(path) && currentUser()) {
        window.location.hash = '#dashboard';
    } else {
        // updateNav();
        updateMain(path);
    }
}

updateContent();