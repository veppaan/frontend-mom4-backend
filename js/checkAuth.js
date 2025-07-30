"use strict";

async function checkToken(){

if(!localStorage.getItem("token")){
    window.location.href = "login.html";
} else {
    const token = localStorage.getItem("token");
    try {
        const resp = await fetch("https://backend-mom4-1.onrender.com/token", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ` + token
            }
        })

        if(resp.ok) {
            const data = await resp.json();
            console.log(data);
        }else{
            localStorage.removeItem("token");
            window.location.href = "login.html";
        }
    } catch (error) {
        console.log("Det blev något fel med token-autentisering!");
    }
}
}
checkToken();