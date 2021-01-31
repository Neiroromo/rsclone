import { loginProfile } from './loginExitProfile.js';

const btnRegister = document.querySelector('#btnReg');
const regLogin = document.querySelector('#regLogin');
const regPassword = document.querySelector('#regPassword');
const regPasswordConfirm = document.querySelector('#regPasswordConfirm');
const regEmail = document.querySelector('#regEmail');
const regAPI = 'http://localhost:8000/api/v1/users/signup';

export default async function regUser() {
  const nameReg = regLogin.value.trim().toLowerCase();
  const passwordReg = regPassword.value.trim();
  const passwordConfirmReg = regPasswordConfirm.value.trim();
  const emailReg = regEmail.value.trim().toLowerCase();

  const userReg = {
    name: nameReg,
    password: passwordReg,
    passwordConfirm: passwordConfirmReg,
    email: emailReg,
  };

  // console.log(userReg);
  // console.log(JSON.stringify(userReg));

  try {
    const response = await fetch(regAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(userReg),
    }).then((res) => res.json());
    console.log(response);
    localStorage.setItem('userName', response.data.user.name);
    localStorage.setItem('userID', response.data.user._id);
    loginProfile(response.data.user.name);
  } catch (err) {
    alert(err);
  }
}
