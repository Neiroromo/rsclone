const btnRegister = document.querySelector('#btnReg');
const regLogin = document.querySelector('#regLogin');
const regPassword = document.querySelector('#regPassword');
const regPasswordConfirm = document.querySelector('#regPasswordConfirm');
const regEmail = document.querySelector('#regEmail');
const regAPI = 'http://127.0.0.1:8000/api/v1/users/signup';
console.log(regAPI);

function regUser() {
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

  const response = fetch(regAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(userReg),
  }).then((res) => {
    console.log(res.json());
  });
  console.log(response);
}

btnRegister.addEventListener('click', regUser);
