const loginForm = document.querySelector('.login');
const signinForm = document.querySelector('.signin');
const loginLinks = document.querySelectorAll('.link-login');
const signinLink = document.querySelector('#linkSignin');
const btnLog = document.querySelector('#btnLog');
const btnUser = document.querySelector('#btnUser');
const btnExit = document.querySelector('#btnExit');
const btnSubmit = document.querySelector('.submit-btn');
// const regResultForm = document.querySelector(".result-register");

function showLoginForm() {
  signinForm.classList.add('hide-modal');
  loginForm.classList.remove('hide-modal');
  // regResultForm.classList.add("hide-modal");
}

function showSigninForm() {
  loginForm.classList.add('hide-modal');
  signinForm.classList.remove('hide-modal');
}

function loginProfile() {
  btnUser.removeAttribute('hidden');
  btnLog.setAttribute('hidden', '');
}

function exitProfile() {
  btnUser.setAttribute('hidden', '');
  btnLog.removeAttribute('hidden');
}

/* function showRegResult() {
  signinForm.classList.add("hide-modal");
  regResultForm.classList.remove("hide-modal");
} */

loginLinks.forEach((item) => item.addEventListener('click', showLoginForm));
signinLink.addEventListener('click', showSigninForm);
btnLog.addEventListener('click', showLoginForm);
btnSubmit.addEventListener('click', loginProfile);
btnExit.addEventListener('click', exitProfile);
