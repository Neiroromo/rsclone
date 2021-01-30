import editor from './editor.behavior.js';

function articlePageListeners(e) {
  let { target } = e;

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
}

export default function addArticlePageListeners() {
  const articlePage = document.querySelector('.article-page-container');
  articlePage.addEventListener('click', (e) => {
    articlePageListeners(e);
  });
}
