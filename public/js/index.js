import authUser from './authorization.js';
import loginProfile from './loginExitProfile.js';


const loginForm = document.querySelector('.login');
const signinForm = document.querySelector('.signin');
const loginLinks = document.querySelectorAll('.link-login');
const signinLink = document.querySelector('#linkSignin');
const btnLog = document.querySelector('#btnLog');
// const btnSubmit = document.querySelector('.submit-btn');
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


/* function showRegResult() {
  signinForm.classList.add("hide-modal");
  regResultForm.classList.remove("hide-modal");
} */

loginLinks.forEach((item) => item.addEventListener('click', showLoginForm));
signinLink.addEventListener('click', showSigninForm);
btnLog.addEventListener('click', showLoginForm);
btnAuth.addEventListener('click', authUser);
//btnAuth.addEventListener('click', loginProfile);
// btnSubmit.addEventListener('click', loginProfile);
//btnExit.addEventListener('click', exitProfile);
// btnUserProfile.addEventListener('click', )
