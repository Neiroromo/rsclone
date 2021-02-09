import loginCheck from './loginCheck.js';

const divProfile = document.querySelector('#divProfile');
const btnUser = document.querySelector('.btn-user');
const btnLog = document.querySelector('#btnLog');

export default function toggleLoginRegistrationBtn() {
  if (loginCheck.isLoggedIn) {
    btnUser.innerHTML = loginCheck.userName;
    divProfile.removeAttribute('hidden');
    btnLog.setAttribute('hidden', '');
  } else {
    divProfile.setAttribute('hidden', '');
    btnLog.removeAttribute('hidden');
  }
}
