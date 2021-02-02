import toggleLoginRegistrationBtn from './loginRegisterBtnToggle.js';
import pageRender from './page-render.js';

const loginCheck = {
  isLoggedIn: false,
  userName: '',
  userID: '',
  fetchURL: 'http://localhost:8000/api/v1/',
  isLogged() {
    const userName = localStorage.getItem('userName');
    const userID = localStorage.getItem('userID');
    if (userName && userID && document.cookie) {
      this.isLoggedIn = true;
      this.userName = userName;
      this.userID = userID;
    }
    toggleLoginRegistrationBtn();
  },
  async logIn(email, password) {
    const data = { email, password };
    const response = await fetch(`${this.fetchURL}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((error) => error.json());

    if (response.status === 'fail') {
      alert('Введенные данные не верны');
      console.log(response.message);
    } else {
      this.userName = response.data.user.name;
      this.userID = response.data.user._id;
      localStorage.setItem('userName', this.userName);
      localStorage.setItem('userID', this.userID);
      this.closeModal();
    }
    this.isLogged();
  },
  async logOut() {
    const response = await fetch(`${this.fetchURL}users/logout`)
      .then((res) => res.json())
      .catch((error) => error.json());

    if (response.status === 'fail') {
      console(response.message);
    } else {
      localStorage.removeItem('userName');
      localStorage.removeItem('userID');
      this.isLoggedIn = false;
      this.userName = '';
      this.userID = '';
      this.isLogged();
    }
  },
  async registration(name, password, passwordConfirm, email) {
    const data = { name, password, passwordConfirm, email };
    const response = await fetch(`${this.fetchURL}users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((error) => error.json());
    if (response.status === 'fail') {
      console.log(response.message);
      alert('Ошибка при регистрации');
    } else {
      this.userName = response.data.user.name;
      this.userID = response.data.user._id;
      localStorage.setItem('userName', this.userName);
      localStorage.setItem('userID', this.userID);
      this.closeModal();
    }
    this.isLogged();
  },
  closeModal() {
    const click = new Event('click', {
      bubbles: true,
    });
    const closeBtn = document.querySelectorAll('.close');
    closeBtn.forEach((btn) => {
      btn.dispatchEvent(click);
    });
  },
  async changeSettings(settingType, newValue) {
    const data = {
      settingType,
      newValue,
    };
    const response = await fetch(`${this.fetchURL}users/updateMe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((error) => error.json());
    if (response.status === 'fail') {
      console.log(response.message);
      alert('Ошибка при регистрации');
    } else {
      this.userName = response.data.user.name;
      this.userID = response.data.user._id;
      localStorage.setItem('userName', this.userName);
      localStorage.setItem('userID', this.userID);
      this.closeModal();
    }
  },
  async deleteUser() {
    const response = await fetch(`${this.fetchURL}users/deleteMe`)
      .then((res) => res.json())
      .catch((error) => error.json());
    if (response.status === 'fail') {
      console.log(response.message);
      alert('Ошибка');
    } else {
      console.log('удален');
      localStorage.removeItem('userName');
      localStorage.removeItem('userID');
      this.isLoggedIn = false;
      this.userName = '';
      this.userID = '';
      this.isLogged();
      pageRender.renderNewPage('main');
    }
  },
};

export default loginCheck;
