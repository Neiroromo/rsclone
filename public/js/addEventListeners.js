import pageRender from './page-render.js';
import editor from './editor.behavior.js';
import listItemBehavior from './list-items.behavior.js';
import regUser from './registration.js';
import searchArticle from './search.js';
import { exitProfile } from './loginExitProfile.js';
import authUser from './authorization.js';
// eslint-disable-next-line import/no-cycle
import { showPreviousPage, showNextPage, showFirstPage, showLastPage } from './pagination.js';
import createArticleMainPageItem from './tamplates/articles-mainPage-item.js';


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
  if (
    target.nodeName === 'SPAN' ||
    target.nodeName === 'TD' ||
    target.classList.contains('mb-1')
  ) {
    target = target.parentNode;
  }

  while (target.hasAttribute('unclickable')) {
    target = target.parentNode;
  }
  if (target.nodeName === 'TH') return;
  // main btns
  const loginForm = document.querySelector('.login');
  const signinForm = document.querySelector('.signin');
  const loginLinks = document.querySelectorAll('.link-login');
  const signinLink = document.querySelector('#linkSignin');
  const btnLog = document.querySelector('#btnLog');
  const divProfile = document.querySelector('#divProfile');
  const btnUser = document.querySelector('.btn-user');
  const btnExit = document.querySelector('#btnExit');
  const btnSubmit = document.querySelector('.submit-btn');
  const currPage = document.querySelector('.current-page');





  // лисенеры на начальной странице (main)
  if (target.classList.contains('link-login') || target.id === 'btnLog') {
    signinForm.classList.add('hide-modal');
    loginForm.classList.remove('hide-modal');
    // regResultForm.classList.add("hide-modal");
  }
  if (target.id === 'linkSignin') {
    loginForm.classList.add('hide-modal');
    signinForm.classList.remove('hide-modal');
  }
  if (target.classList.contains('submit-btn')) {
    authUser();
  }
  if (target.id === 'btnExit') {
    exitProfile();
  }
  if (target.id === 'btnReg') {
    regUser();
  }
  if (target.classList.contains('btn-search')) {
    searchArticle();
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

  if (target.classList.contains('save-article-to-server')) {
    editor.saveArticle();
  }
  if (target.classList.contains('switch-to-edit')) {
    editor.turnOnEditor();
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
    editor.turnOffEditor();
  }

  // лисенеры страницы профиля (userProfile)

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
    pageRender.renderNewPage('articlePage');
    editor.articleID = null;
    // listItemBehavior.createNewArticle();
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

  // pagination
  if (target.classList.contains('first-page')) {
    showFirstPage(currPage);
  }
  if (target.classList.contains('prev-page')) {
    showPreviousPage(currPage);
  }
  if (target.classList.contains('next-page')) {
    showNextPage(currPage);
  }
  if (target.classList.contains('last-page')) {
    showLastPage(10, currPage);
  }
}

export default function addListeners() {
  const bodyElement = pageRender.pageContainer;
  bodyElement.addEventListener('click', (e) => {
    clickListeners(e);
  });
}
