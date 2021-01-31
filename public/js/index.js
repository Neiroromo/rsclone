import pageRender from './page-render.js';
import addListeners from './addEventListeners.js';
import listItemBehavior from './list-items.behavior.js';
import createArticleMainPageItem from './tamplates/articles-mainPage-item.js';

pageRender.renderNewPage('main');
addListeners();

const a = listItemBehavior
  .getArticlesList('*', pageRender.pageNumber, pageRender.articlesLimitOnPage)
  .then((res) => {
    const articles = Object.values(res);
    articles.forEach((article) => {
      const { title, desc, authorID } = article;
      const DOMElement = pageRender.getDOMElemets(
        createArticleMainPageItem(title, authorID, desc)
      );
      console.log(pageRender.mainPageArticlesContainer);
      document.querySelector('.list-article').append(DOMElement);
    });
  });
