
const menu = document.getElementById("menu");
const logoutBtn = document.getElementById("logout-button");

//formulär
const loginForm = document.getElementById("login-form");
const productForm = document.getElementById("register-form");

if(logoutBtn){
    logoutBtn.addEventListener("click", function() {
        localStorage.removeItem("webshop_token");
        window.location.href = "login.html";
    });
}

window.onload = init;

function init() {
    changeMenu();

    if(loginForm){
        loginForm.addEventListener("submit", loginUser);
    }
}

function changeMenu(){
    if(localStorage.getItem("webshop_token")){
        menu.innerHTML = `
        <li><a href="index.html">Startsida</a></li>
        <li><a href="admin.html">Admin</a></li>
        <li><button id="logout-button" class="logout-button">Logga ut</button></li>
        `
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