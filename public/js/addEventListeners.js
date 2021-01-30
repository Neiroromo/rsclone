// import pageRender from './page-render.js'; // файл в котором хранится ссылка на main, а так же происходит рендер страниц
// в дальнейшем раскоментируем

function clickListeners(e) {
  let { target } = e;

  if (target.nodeName === 'SPAN' || target.nodeName === 'TD') {
    target = target.parentNode;
  }
  if (target.nodeName === 'TH') return;

  if ('проверка target на условие наличия класса или id или др.') {
    //действия которые нужно сделать .. запуск скрипта
  }
}

export default function addListeners() {
  // const mainElement = pageRender.pageContainer; // ссылка на main
  const mainElement = document.querySelector('main');
  mainElement.addEventListener('click', (e) => {
    clickListeners(e);
  });
}
