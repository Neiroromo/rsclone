import pageRender from './page-render.js';
import editor from './editor.behavior.js';
import listItemBehavior from './list-items.behavior.js';
import loginCheck from './loginCheck.js';
import createArticleMainPageItem from './tamplates/articles-mainPage-item.js';
import changeBtnAvailable from './pagination.js';

function changeModalInner(settingsType) {
  const title = document.querySelector('#settingsTitle');
  const body = document.querySelector('#settingsBody');
  const input = document.querySelector('.change-value');

  if (settingsType === 'password') {
    title.innerHTML = 'Изменить пароль';
    body.innerHTML = 'Пароль';
    input.value = '';
    input.placeholder = 'Введите новый пароль';
  }
  if (settingsType === 'login') {
    title.innerHTML = 'Изменить имя пользователя';
    body.innerHTML = 'Имя пользователя';
    input.value = '';
    input.placeholder = 'Введите новое имя пользователя';
  }
  if (settingsType === 'email') {
    title.innerHTML = 'Изменить email';
    body.innerHTML = 'Email';
    input.value = '';
    input.placeholder = 'Введите новый email';
  }
}

function clickListeners(e) {
  let { target } = e;
  console.log(target);
  if (
    target.nodeName === 'SPAN' ||
    target.nodeName === 'TD' ||
    target.classList.contains('page-link') ||
    target.classList.contains('mb-1')
  ) {
    target = target.parentNode;
  }

  while (target.hasAttribute('unclickable')) {
    target = target.parentNode;
  }

  if (target.nodeName === 'TH' || target.classList.contains('unclickable'))
    return;
  // main btns
  const loginForm = document.querySelector('.login');
  const signinForm = document.querySelector('.signin');

  // лисенеры на начальной странице (main)
  if (target.classList.contains('link-login') || target.id === 'btnLog') {
    signinForm.classList.add('hide-modal');
    loginForm.classList.remove('hide-modal');
    // regResultForm.classList.add("hide-modal");
  }

  if (target.id === 'toMainPage') {
    pageRender.renderNewPage('main');
  }
  if (target.id === 'linkSignin') {
    loginForm.classList.add('hide-modal');
    signinForm.classList.remove('hide-modal');
  }
  if (target.id === 'btnAuth') {
    const email = document.querySelector('#authEmail').value;
    const password = document.querySelector('#authPassword').value;
    loginCheck.logIn(email, password);
  }
  if (target.id === 'btnExit') {
    loginCheck.logOut();
    // exitProfile();
  }
  if (target.id === 'btnReg') {
    const name = document.querySelector('#regLogin').value;
    const password = document.querySelector('#regPassword').value;
    const passwordConfirm = document.querySelector('#regPasswordConfirm').value;
    const email = document.querySelector('#regEmail').value;
    loginCheck.registration(name, password, passwordConfirm, email);
  }
  if (target.classList.contains('btn-search')) {
    pageRender.searchTitle = document.querySelector('#searchForm').value.trim();
    pageRender.pageNumber = 1;
    pageRender.articlesManePageAddToDOM();
  }
  if (target.classList.contains('mainPage-openArticle-btn')) {
    editor.articleID = target.getAttribute('data-articleID');
    pageRender.renderNewPage('articlePage');
  }
  if (target.id === 'profile') {
    pageRender.renderNewPage('userProfile');
  }

  // лисенеры на странице просмотра\редактирования статьи (articlePage)

  if (target.nodeName === 'SPAN' || target.nodeName === 'TD') {
    target = target.parentNode;
  }
  if (target.nodeName === 'TH') return;

  if (target.classList.contains('open-changed-article')) {
    const articlesID = target.getAttribute('data-changedarticleid');
    editor.articleID = articlesID;
    pageRender.renderNewPage('articlePage');
  }
  if (target.classList.contains('save-article-to-server')) {
    editor.saveArticle();
  }
  if (target.classList.contains('see-article-inReadMode')) {
    const resetChages = false;
    if (editor.pageState === 'edit') editor.turnOffEditor(resetChages);
    if (editor.pageState === 'read') editor.turnOnEditor();
  }
  if (target.classList.contains('switch-to-edit')) {
    if (loginCheck.isLoggedIn) {
      editor.turnOnEditor();
    } else {
      alert('Для этого действия нужно войти');
    }
  }
  if (target.classList.contains('hideShow-history')) {
    // const workspace = document.querySelector('.workspace');
    // workspace.classList.toggle('fullWidth');
  }
  if (target.nodeName === 'TR') {
    const articleID = target.getAttribute('data-changedArticleID');
    // получить статью и загрузить ее в редактор
  }
  if (target.classList.contains('discard-article')) {
    const resetChages = true;
    editor.turnOffEditor(resetChages);
  }

  // лисенеры страницы профиля (userProfile)

  if (target.nodeName === 'SPAN') {
    target = target.parentNode;
  }
  if (target.classList.contains('drop-email-btn')) {
    listItemBehavior.changeSettings = 'email';
    changeModalInner('email');
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
    loginCheck.deleteUser();
  }
  if (target.classList.contains('main-create-btn')) {
    editor.articleID = null;
    pageRender.renderNewPage('articlePage');
    const isNew = true;
    editor.turnOnEditor(isNew);
    // listItemBehavior.createNewArticle();
  }
  if (target.classList.contains('delete-articles-from-server-btn')) {
    listItemBehavior.deleteArticlesFromServer();
  }
  if (target.classList.contains('dismiss-delete-btn')) {
    listItemBehavior.deleteIDFromStack();
  }

  // article list UL
  if (target.classList.contains('article-checkbox')) {
    listItemBehavior.selectArticle(e);
  }
  if (target.classList.contains('article-item')) {
    // const checkbox = target.children[0];
    // console.log(checkbox);
    // const click = new Event('click', {
    //   bubbles: true,
    // });
    // checkbox.dispatchEvent(click);
  }
  if (target.classList.contains('open-article-elem')) {
    if (listItemBehavior.selectingState) return;
    editor.articleID = listItemBehavior.getArticleID(e);
    pageRender.renderNewPage('articlePage');
    editor.pageState = 'read';
  }
  if (target.classList.contains('article-edit-btn')) {
    editor.articleID = listItemBehavior.getArticleID(e);
    editor.pageState = 'edit';
    pageRender.renderNewPage('articlePage');
  }
  if (target.classList.contains('article-delete-btn')) {
    listItemBehavior.addIDToStack(e);
  }

  // pagination
  if (target.classList.contains('first-page')) {
    pageRender.pageNumber = 1;
    if (pageRender.currentPage === 'main') {
      pageRender.mainPageArticlesContainer.innerHTML = '';
      pageRender.articlesManePageAddToDOM();
    } else if (pageRender.currentPage === 'userProfile') {
      pageRender.userPageArticleListContainer.innerHTML = '';
      pageRender.articlesUserPageAddToDOM();
    }
    changeBtnAvailable();
  }
  if (target.classList.contains('prev-page')) {
    if (pageRender.pageNumber <= 1) {
      pageRender.pageNumber = 1;
    } else {
      pageRender.pageNumber -= 1;
    }
    if (pageRender.currentPage === 'main') {
      pageRender.mainPageArticlesContainer.innerHTML = '';
      pageRender.articlesManePageAddToDOM();
    } else if (pageRender.currentPage === 'userProfile') {
      pageRender.userPageArticleListContainer.innerHTML = '';
      pageRender.articlesUserPageAddToDOM();
    }
    changeBtnAvailable();
  }
  if (target.classList.contains('next-page')) {
    if (pageRender.pageNumber >= pageRender.maxPagesCount) {
      pageRender.pageNumber = pageRender.maxPagesCount;
    } else {
      pageRender.pageNumber += 1;
    }
    if (pageRender.currentPage === 'main') {
      pageRender.mainPageArticlesContainer.innerHTML = '';
      pageRender.articlesManePageAddToDOM();
    } else if (pageRender.currentPage === 'userProfile') {
      pageRender.userPageArticleListContainer.innerHTML = '';
      pageRender.articlesUserPageAddToDOM();
    }
    changeBtnAvailable();
  }
  if (target.classList.contains('last-page')) {
    pageRender.pageNumber = pageRender.maxPagesCount;
    if (pageRender.currentPage === 'main') {
      pageRender.mainPageArticlesContainer.innerHTML = '';
      pageRender.articlesManePageAddToDOM();
    } else if (pageRender.currentPage === 'userProfile') {
      pageRender.userPageArticleListContainer.innerHTML = '';
      pageRender.articlesUserPageAddToDOM();
    }
    changeBtnAvailable();
  }
}

export default function addListeners() {
  const bodyElement = pageRender.pageContainer;
  bodyElement.addEventListener('click', (e) => {
    clickListeners(e);
  });
}
