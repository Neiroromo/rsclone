import pageRender from './page-render.js';
import addListeners from './addEventListeners.js';

//pageRender.renderNewPage('main');
pageRender.renderNewPage('userProfile');
addListeners();

// window.onbeforeunload = function () {
//   return 'Данное действие приведет к ошибке. Если вы хотите вернуть на главную страницу, то перезагрузите вкладку';
// };
pageRender.getMaxArticleCount();
