import pageRender from './page-render.js';
import addListeners from './addEventListeners.js';
import loginCheck from './loginCheck.js';

loginCheck.isLogged();
pageRender.renderNewPage('main');
addListeners();
