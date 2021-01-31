import pageRender from './page-render.js';
import addListeners from './addEventListeners.js';
import loginCheck from './loginCheck.js';

loginCheck.isLogged();
pageRender.renderNewPage('main');
// pageRender.renderNewPage('userProfile');
addListeners();

// window.onbeforeunload = function () {
//   return 'Данное действие приведет к ошибке. Если вы хотите вернуть на главную страницу, то перезагрузите вкладку';
// };


