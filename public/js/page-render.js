import createSearch from './tamplates/search.js';
import createArticlesMainPageContainer from './tamplates/aricles-mainPage-container.js';
import createPagination from './tamplates/pagination.js';
import listItemBehavior from './list-items.behavior.js';
import createArticleMainPageItem from './tamplates/articles-mainPage-item.js';
import createArticlePage from './tamplates/article-page.js';
import editor from './editor.behavior.js';
import createUserPage from './tamplates/user-page.js';
import createArticleUserPageItem from './tamplates/createArticleUserPageItem.js';

const pageRender = {
  currentPage: 'main',
  pageState: 'read',
  pageContainer: document.querySelector('body'),
  renderContainer: document.querySelector('main'),
  mainPageArticlesContainer: '',
  userPageArticleListContainer: '',
  pageNumber: 1,
  articlesLimitOnPage: 10,
  numberOfArticles: null,
  numberOfUserArticles: null,
  userName: '',
  userID: '',
  clearCurrantPage() {
    this.renderContainer.innerHTML = '';
  },
  renderNewPage(pagaName) {
    this.clearCurrantPage();
    this.currentPage = pagaName;
    if (pagaName === 'main') {
      const searchDOM = this.getDOMElemets(createSearch());
      const articleContainerDOM = this.getDOMElemets(
        createArticlesMainPageContainer()
      );
      const paginationDOM = this.getDOMElemets(createPagination());

      this.renderContainer.append(
        searchDOM,
        articleContainerDOM,
        paginationDOM
      );

      this.mainPageArticlesContainer = document.querySelector('.list-article');
      this.pageNumber = 1;
      this.articlesManePageAddToDOM();
    }
    if (pagaName === 'userProfile') {
      const userPageDOM = this.getDOMElemets(createUserPage());
      this.renderContainer.append(userPageDOM);
      this.userPageArticleListContainer = document.querySelector(
        '.articles-container'
      );
      this.pageNumber = 1;
      this.articlesUserPageAddToDOM();
    }
    if (pagaName === 'articlePage') {
      const articlePageDOM = this.getDOMElemets(createArticlePage());
      this.renderContainer.append(articlePageDOM);
      editor.updatedVariables();
      editor.createEditor();
      editor.openArticle(editor.articleID);
    }
  },
  getDOMElemets(html) {
    const htmlObj = new DOMParser().parseFromString(html, 'text/html');
    const DOMElemets = htmlObj.documentElement.lastChild.firstChild;
    return DOMElemets;
  },
  articlesManePageAddToDOM() {
    listItemBehavior
      .getArticlesList('*', this.pageNumber, this.articlesLimitOnPage)
      .then((res) => {
        const articles = Object.values(res);
        articles.forEach((article) => {
          const { title, desc, authorID, _id } = article;
          const DOMElement = pageRender.getDOMElemets(
            createArticleMainPageItem(title, authorID, desc, _id)
          );
          this.mainPageArticlesContainer.append(DOMElement);
        });
      });
  },
  async articlesUserPageAddToDOM() {
    console.log('enter in addArticleListToDOM');
    let articles = await listItemBehavior.getArticlesList(
      this.userID,
      this.pageNumber,
      this.articlesLimitOnPage
    );
    articles = Object.values(articles);
    console.log('данны в рендере', articles);
    this.userPageArticleListContainer.innerHTML = '';
    articles.forEach((article) => {
      const { title, desc, _id } = article;
      const userPageArticleDOM = this.getDOMElemets(
        createArticleUserPageItem(title, desc, _id)
      );

      this.userPageArticleListContainer.append(userPageArticleDOM);
    });
  },
};

export default pageRender;
