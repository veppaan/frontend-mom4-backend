
const menu = document.getElementById("menu");


//formulär
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

window.onload = init;

function updateMenu() {
    const logoutBtn = document.getElementById("logout-button");
    if(logoutBtn){
    logoutBtn.addEventListener("click", () => {
        console.log("klick på loggga ut")
        localStorage.removeItem("webshop_token");
        window.location.href = "login.html";
    });
}
}

function init() {
    changeMenu();

    if(loginForm){
        loginForm.addEventListener("submit", loginUser);
    }
    if(registerForm){
        registerForm.addEventListener("submit", registerUser);
    }
}

function changeMenu(){
    if(localStorage.getItem("webshop_token")){
        menu.innerHTML = `
        <li><a href="index.html">Startsida</a></li>
        <li><a href="admin.html">Admin</a></li>
        <li><a href="" id="logout-button" class="logout-button">Logga ut</a></li>
        `
        updateMenu();
    }else{
        menu.innerHTML = `
        <li><a href="index.html">Startsida</a></li>
        <li><a href="register.html">Registering</a></li>
        <li><a href="login.html" id="login-button" class="auth-button">Logga in</a></li>
        `
    }
}

async function loginUser(e) {
    e.preventDefault();

    let usernameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;

    if(!usernameInput || !passwordInput) {
        console.log("Fyll i alla fält!");
        return;
    }

    let user = {
        username: usernameInput,
        password: passwordInput
    }
    try {
        const resp = await fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })

        if(resp.ok) {
            const data = await resp.json();
            
            localStorage.setItem("webshop_token", data.token);
            window.location.href = "admin.html";
        }else{
            throw error;
        }
    } catch (error) {
        console.log("Felaktigt användarnamn eller lösenord!");
    }
}

async function registerUser(e){
    e.preventDefault();

    let usernameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;

    if(!usernameInput || !passwordInput) {
        console.log("Fyll i alla fält!");
        return;
    }

    let user = {
        username: usernameInput,
        password: passwordInput
    }
    fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        window.location.href = "admin.html";
    })
}