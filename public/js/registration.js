const btnRegister = document.querySelector('#btnReg');
const regLogin = document.querySelector('#regLogin');
const regPassword = document.querySelector('#regPassword');
const regPasswordConfirm = document.querySelector('#regPasswordConfirm');
const regEmail = document.querySelector('#regEmail');
const regAPI = 'http://localhost:8000/api/v1/users/signup';
console.log(regAPI);

async function regUser() {
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

  console.log(userReg);
  console.log(JSON.stringify(userReg));

  try {
    const response = await fetch(regAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(userReg),
    });

    const regResult = await response.json();
    alert(regResult.message);
  } catch (err) {
    alert(err);
  }
}

btnRegister.addEventListener('click', regUser);
