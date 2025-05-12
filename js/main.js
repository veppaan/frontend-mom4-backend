
const menu = document.getElementById("menu");

//formulär
const loginForm = document.getElementById("login-form");
const productForm = document.getElementById("product-form");

window.onload = init;

function init() {

    changeMenu();
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

//Hämta produkter