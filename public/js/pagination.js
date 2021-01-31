import pageRender from './page-render.js';
import addListeners from './addEventListeners.js';
import listItemBehavior from './list-items.behavior.js';
import createArticleMainPageItem from './tamplates/articles-mainPage-item.js';

let currentPage = pageRender.pageNumber;


// function getMainArticles () {
//   listItemBehavior.getArticlesList('*', currentPage, pageRender.articlesLimitOnPage)
//     .then((res) => {
//       const articles = Object.values(res);
//       articles.forEach((article) => {
//         const {
//           title,
//           desc,
//           authorID
//         } = article;
//         const DOMElement = pageRender.getDOMElemets(
//           createArticleMainPageItem(title, authorID, desc)
//         );
//         console.log(pageRender.mainPageArticlesContainer);
//         document.querySelector('.list-article').append(DOMElement);
//       });
//     });
// }

export function showPreviousPage(actPage) {
  currentPage -= 1;

  actPage.innerHTML = `${currentPage}`;
  console.log(currentPage);
  document.querySelector('.list-article').innerHTML = '';
  getMainArticles();
}

export function showNextPage(actPage) {
  currentPage += 1;

  actPage.innerHTML = `${currentPage}`;

  console.log(currentPage);
  document.querySelector('.list-article').innerHTML = '';

  getMainArticles();
}

export function showFirstPage(actPage) {
  currentPage = 1;

  actPage.innerHTML = `${currentPage}`;

  console.log(currentPage);
  document.querySelector('first-page').classList.add('.disabled');
  document.querySelector('prev-page').classList.add('.disabled');

  /*if (currentPage !== 1) {
    document.querySelector('first-page').classList.remove('.disabled');
    document.querySelector('prev-page').classList.remove('.disabled');
  } else {
    document.querySelector('first-page').classList.add('.disabled');
    document.querySelector('prev-page').classList.add('.disabled');
  }*/

  document.querySelector('.list-article').innerHTML = '';
  getMainArticles();
}

export function showLastPage(countArticles, actPage) {
  const countPages = Math.ceil(countArticles / pageRender.articlesLimitOnPage);
  currentPage = countPages;

  actPage.innerHTML = `${currentPage}`;
  console.log(currentPage);
  document.querySelector('last-page').classList.add('.disabled');
  document.querySelector('next-page').classList.add('.disabled');

  /*if (currentPage !== 1) {
    document.querySelector('first-page').classList.remove('.disabled');
    document.querySelector('prev-page').classList.remove('.disabled');
  } else {
    document.querySelector('first-page').classList.add('.disabled');
    document.querySelector('prev-page').classList.add('.disabled');
  }*/

  document.querySelector('.list-article').innerHTML = '';

  getMainArticles();
  return currentPage;
}
