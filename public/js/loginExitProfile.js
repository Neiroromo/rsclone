const btnAuth = document.querySelector('#btnAuth');
const btnUserProfile = document.querySelector('#profile');
const divProfile = document.querySelector('#divProfile');
const btnUser = document.querySelector('.btn-user');
const btnExit = document.querySelector('#btnExit');
const btnLog = document.querySelector('#btnLog');

function exitProfile() {
  divProfile.setAttribute('hidden', '');
  btnLog.removeAttribute('hidden');
  localStorage.removeItem('userName');
  localStorage.removeItem('userID');
}

btnExit.addEventListener('click', exitProfile);

export default function loginProfile(nameUser) {  
  btnUser.innerHTML = `${nameUser}`;
  divProfile.removeAttribute('hidden');
  btnLog.setAttribute('hidden', '');
}
