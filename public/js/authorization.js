// const btnAuth = document.querySelector('#btnAuth');
import { loginProfile } from './loginExitProfile.js';
import pageRender from './page-render.js';

const authEmail = document.querySelector('#authEmail');
const authPassword = document.querySelector('#authPassword');
const authAPI = 'http://localhost:8000/api/v1/users/login';
console.log(authAPI);

export default async function authUser() {
  const emailAuth = authEmail.value.trim().toLowerCase();
  const passwordAuth = authPassword.value.trim();

  const userAuth = {
    password: passwordAuth,
    email: emailAuth,
  };

  console.log(userAuth);
  console.log(JSON.stringify(userAuth));

  const response = await fetch(authAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(userAuth),
  })
    .then((res) => res.json())
    .catch((error) => error.json());

  if (response.status === 'fail') {
    console.log(response.message);
  } else {
    const dataUser = response.data.user.name;
    pageRender.userName = dataUser;
    pageRender.userID = response.data.user._id;
    loginProfile(dataUser);
  }
}

// btnAuth.addEventListener('click', authUser);
