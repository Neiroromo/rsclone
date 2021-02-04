import pageRender from './page-render.js';
import addListeners from './addEventListeners.js';
import loginCheck from './loginCheck.js';

alert('ссылка на pull-request https://github.com/Neiroromo/rsclone/pulls');

loginCheck.isLogged();
pageRender.renderNewPage('main');
addListeners();
//пытаюсь запустить хироку
