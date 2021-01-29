import listItemBehavior from './list-items.behavior.js';

function changeModalInner(settingsType) {
  const title = document.querySelector('#settingsTitle');
  const body = document.querySelector('#settingsBody');
  if (settingsType === 'password') {
    title.innerHTML = 'Изменить пароль';
    body.innerHTML = 'Пароль';
  }
  if (settingsType === 'login') {
    title.innerHTML = 'Изменить логин';
    body.innerHTML = 'Логин';
  }
}

function clickListeners(e) {
  let { target } = e;

  if (target.nodeName === 'SPAN') {
    target = target.parentNode;
  }
  if (target.classList.contains('drop-login-btn')) {
    listItemBehavior.changeSettings = 'login';
    changeModalInner('login');
  }
  if (target.classList.contains('drop-password-btn')) {
    listItemBehavior.changeSettings = 'password';
    changeModalInner('password');
  }
  if (target.classList.contains('save-user-settings-btn')) {
    listItemBehavior.changeUserSettings();
  }
  if (target.classList.contains('delete-user-btn')) {
    listItemBehavior.deleteProfile();
  }
  if (target.classList.contains('main-create-btn')) {
    listItemBehavior.createNewArticle();
  }
  if (target.classList.contains('delete-articles-from-server-btn')) {
    listItemBehavior.deleteArticlesFromServer();
  }
  if (target.classList.contains('dismiss-delete-btn')) {
    listItemBehavior.deleteIDFromStack();
    console.log('e');
  }

  // article list UL
  if (target.classList.contains('article-checkbox')) {
    listItemBehavior.selectArticle(e);
  }
  if (target.classList.contains('open-article-elem')) {
    listItemBehavior.openArticle(e);
  }
  if (target.classList.contains('article-edit-btn')) {
    listItemBehavior.editArticle(e);
  }
  if (target.classList.contains('article-delete-btn')) {
    listItemBehavior.addIDToStack(e);
  }
}

export default function addListeners() {
  const userProfileContainer = document.querySelector(
    '.user-profile-container'
  );

  userProfileContainer.addEventListener('click', (e) => {
    clickListeners(e);
  });
}
