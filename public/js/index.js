const loginForm = document.querySelector(".login");
const signinForm = document.querySelector(".signin");
const loginLink = document.querySelector("#linkLogin");
const signinLink = document.querySelector("#linkSignin");
const btnLog = document.querySelector("#btnLog");
const btnUser = document.querySelector("#btnUser");
const btnExit = document.querySelector("#btnExit");
const btnSubmit = document.querySelector(".submit-btn");

function showLoginForm () {
    signinForm.classList.add("hide-modal");
    loginForm.classList.remove("hide-modal");
}

function showSigninForm () {
    loginForm.classList.add("hide-modal");
    signinForm.classList.remove("hide-modal");
}

function loginProfile () {
    btnUser.removeAttribute("hidden");
    btnLog.setAttribute("hidden", "");
}

function exitProfile () {
    btnUser.setAttribute("hidden", "");
    btnLog.removeAttribute("hidden");    
}

loginLink.addEventListener("click", showLoginForm);
signinLink.addEventListener("click", showSigninForm);
btnLog.addEventListener("click", showLoginForm);
btnSubmit.addEventListener("click", loginProfile);
btnExit.addEventListener("click", exitProfile);