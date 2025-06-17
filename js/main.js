
const menu = document.getElementById("menu");
const errorMsg = document.getElementById("error-msg");


//formulär
const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");

window.onload = init;

function updateMenu() {
    const logoutBtn = document.getElementById("logout-button");
    if(logoutBtn){
    logoutBtn.addEventListener("click", () => {
        console.log("klick på loggga ut")
        localStorage.removeItem("token");
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
    if(localStorage.getItem("token")){
        menu.innerHTML = `
        <li><a href="index.html">Startsida</a></li>
        <li><a href="admin.html">Admin</a></li>
        <li><a href="protected.html">Skyddad sida</a></li>
        <li><a href="" id="logout-button">Logga ut</a></li>
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
        const resp = await fetch("https://backend-mom4-1.onrender.com/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })

        if(resp.ok) {
            const data = await resp.json();
            
            localStorage.setItem("token", data.response.token);
            console.log(data.token);
            window.location.href = "admin.html";
        }else{
            throw error;
        }
    } catch (error) {
        errorMsg.innerHTML = "Felaktigt användarnamn eller lösenord!";
        console.log("Felaktigt användarnamn eller lösenord!");
    }
}

//Protected page
async function getProtectedData() {
    const token = localStorage.getItem("token");
    const protectedText = document.getElementById("protected-text");
    try {
        const resp = await fetch("https://backend-mom4-1.onrender.com/api/protected", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ` + token
            }
        })

        if(resp.ok) {
            const data = await resp.json();
            console.log(data);
            protectedText.innerHTML = "";
            data.forEach(user => {
                protectedText.innerHTML += `<li>${user.username}</li>`
            });
            //protectedText.innerHTML = "Inloggningen lyckades med giltig token!";
        }else{
            console.log(token)
            protectedText.innerHTML = "Inloggningen misslyckades med ogiltig token!";
            throw new Error("Ogiltig token");
        }
    } catch (error) {
        console.log("Det blev något fel med token-autentisering!");
    }
}

if(window.location.href.includes("protected.html")){
    getProtectedData();
}

async function registerUser(e){
    e.preventDefault();

    let usernameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;

    if(!usernameInput || !passwordInput) {
        errorMsg.innerHTML = "Fyll i alla fält!";
        console.log("Fyll i alla fält!");
        return;
    }

    let user = {
        username: usernameInput,
        password: passwordInput
    }

        try {
            const resp = await fetch("https://backend-mom4-1.onrender.com/api/register", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
    
            if(resp.ok) {
                const data = await resp.json();
                console.log(data);
                window.location.href = "login.html";
            }else{
                throw error;
            }
        } catch (error) {
            errorMsg.innerHTML = "Felaktigt användarnamn eller lösenord!";
            console.log("Felaktigt användarnamn eller lösenord!");
        }
}