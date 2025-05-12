const productList = document.getElementById("product-list");
const menu = document.getElementById("menu");

//formulär
const loginForm = document.getElementById("login-form");
const productForm = document.getElementById("product-form");

window.onload = init;

function init() {
    if(productList) {
        getProducts();
    }
}

//Hämta produkter