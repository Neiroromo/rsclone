import createSearch from './tamplates/search.js';
import createArticlesMainPageContainer from './tamplates/aricles-mainPage-container.js';
import createPagination from './tamplates/pagination.js';
import listItemBehavior from './list-items.behavior.js';
import createArticleMainPageItem from './tamplates/articles-mainPage-item.js';
import createArticlePage from './tamplates/article-page.js';
import editor from './editor.behavior.js';
import createUserPage from './tamplates/user-page.js';
import createArticleUserPageItem from './tamplates/createArticleUserPageItem.js';
import loginCheck from './loginCheck.js';
import changeBtnAvailable from './pagination.js';

const pageRender = {
  currentPage: 'main',
  pageContainer: document.querySelector('body'),
  renderContainer: document.querySelector('main'),
  mainPageArticlesContainer: '',
  userPageArticleListContainer: '',
  pageNumber: 1,
  articlesLimitOnPage: 2,
  numberOfArticles: null,
  maxPagesCount: null,
  searchTitle: '',
  clearCurrantPage() {
    this.renderContainer.innerHTML = '';
  },
  async renderNewPage(pagaName) {
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
      editor.pageState = 'read';
      await this.getMaxArticleCount();
      changeBtnAvailable();
    }
    if (pagaName === 'userProfile') {
      const userPageDOM = this.getDOMElemets(createUserPage());
      const paginationDOM = this.getDOMElemets(createPagination());
      this.renderContainer.append(userPageDOM, paginationDOM);
      this.userPageArticleListContainer = document.querySelector(
        '.articles-container'
      );
      this.pageNumber = 1;
      this.articlesUserPageAddToDOM();
      editor.pageState = 'read';
      await this.getMaxArticleCount();
      changeBtnAvailable();
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
      .getArticlesList(
        '*',
        this.pageNumber,
        this.articlesLimitOnPage,
        this.searchTitle
      )
      .then((res) => {
        const articles = Object.values(res);
        this.mainPageArticlesContainer.innerHTML = '';
        articles.forEach((article) => {
          const { title, desc, authorID, _id } = article;
          console.log('прверка: ', title, desc, authorID, _id);
          const DOMElement = pageRender.getDOMElemets(
            createArticleMainPageItem(title, authorID, desc, _id)
          );
          this.mainPageArticlesContainer.append(DOMElement);
        });
      });
  },
  async articlesUserPageAddToDOM() {
    console.log('enter in addArticleListToDOM');
    console.log(
      'data: ',
      loginCheck.userID,
      this.pageNumber,
      this.articlesLimitOnPage
    );
    let articles = await listItemBehavior.getArticlesList(
      loginCheck.userID,
      this.pageNumber,
      this.articlesLimitOnPage
    );
    console.log('dannie : ', articles);
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

  async getMaxArticleCount() {
    const userID = this.userID;
    if (userID === '') userID = '*';
    console.log(userID);
    const url = `http://localhost:8000/api/v1/articles/${userID}`;
    const res = await fetch(`${url}`).then((response) => response.json());
    this.numberOfArticles = res.maxCount;
    this.maxPagesCount = Math.ceil(
      this.numberOfArticles / this.articlesLimitOnPage
    );
  },
};

export default pageRender;
