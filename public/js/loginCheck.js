import toggleLoginRegistrationBtn from './loginRegisterBtnToggle.js';

const loginCheck = {
  isLoggedIn: false,
  userName: '',
  userID: '',
  fetchURL: 'http://localhost:8000/api/v1/',
  isLogged() {
    const userName = localStorage.getItem('userName');
    const userID = localStorage.getItem('userID');
    if (userName && userID) {
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
      console.log(response.message);
    } else {
      this.userName = response.data.user.name;
      this.userID = response.data.user._id;
      localStorage.setItem('userName', this.userName);
      localStorage.setItem('userID', this.userID);
    }
    this.isLogged();
  },
  async logOut() {
    // const response = await fetch(`${this.fetchURL}users/logout`)
    //   .then((res) => res.json())
    //   .catch((error) => error.json());

    // if (response.status === 'fail') {
    //   console.log(response.message);
    // } else {
    //   console.log('выход');
    // }
    alert('Нужно добавить выход с сервера');
    localStorage.removeItem('userName');
    localStorage.removeItem('userID');
    this.isLoggedIn = false;
    this.userName = null;
    this.userID = null;
    this.isLogged();
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
    } else {
      this.userName = response.data.user.name;
      this.userID = response.data.user._id;
      localStorage.setItem('userName', this.userName);
      localStorage.setItem('userID', this.userID);
    }
    this.isLogged();
  },
};

export default loginCheck;
