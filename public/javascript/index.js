import listItemBehavior from './list-items.behavior.js';
import createArticleItem from './tamplates/article-item.js';
import addListeners from './profile-btn-listeners.js';
import addArticlePageListeners from './article-page-listeners.js';
import editor from './editor.behavior.js';

const userName = 'Rudolf';
const articlesLimitOnPage = 10;
export default async function addArticleListToDOM() {
  console.log('enter in addArticleListToDOM');
  let articles = await listItemBehavior.getArticlesList(
    userName,
    '1',
    articlesLimitOnPage
  );
  articles = Object.values(articles);
  const listContainer = document.querySelector('.articles-container');
  listContainer.innerHTML = '';
  articles.forEach((article) => {
    const { title, desc } = article;
    const html = createArticleItem(title, desc);
    const htmlObj = new DOMParser().parseFromString(html, 'text/html');
    listContainer.append(htmlObj.documentElement.lastChild.firstChild);
  });
}

// addArticleListToDOM();
addArticlePageListeners();
// addListeners();
const openArticleID = '601550d1e7a6da40f0d9f41c';
editor.openArticle(openArticleID);
editor.createEditor();
