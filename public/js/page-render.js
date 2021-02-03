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
  articlesLimitOnPage: 5,
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
      editor.articleID = null;
      editor.articleIDMain = null;
      this.editorOn = false;
      editor.pageState = 'read';
      this.editingData = null;
    }
    if (pagaName === 'userProfile') {
      const userPageDOM = this.getDOMElemets(createUserPage());
      const paginationDOM = this.getDOMElemets(createPagination());
      this.renderContainer.append(userPageDOM, paginationDOM);
      this.userPageArticleListContainer = document.querySelector(
        '.articles-container'
      );
      this.pageNumber = 1;
      this.searchTitle = '';
      this.articlesUserPageAddToDOM();
      editor.articleID = null;
      editor.articleIDMain = null;
      this.editorOn = false;
      editor.pageState = 'read';
      this.editingData = null;
    }
    if (pagaName === 'articlePage') {
      this.searchTitle = '';
      const articlePageDOM = this.getDOMElemets(createArticlePage());
      this.renderContainer.append(articlePageDOM);
      editor.updatedVariables();
      await editor.openArticle(editor.articleID);
      await editor.getChangedArticles();
    }
  },
  getDOMElemets(html) {
    const htmlObj = new DOMParser().parseFromString(html, 'text/html');
    const DOMElemets = htmlObj.documentElement.lastChild.firstChild;
    return DOMElemets;
  },
  async articlesManePageAddToDOM() {
    await this.getMaxArticleCount();
    changeBtnAvailable();

    listItemBehavior
      .getArticlesList(
        '*',
        this.pageNumber,
        this.articlesLimitOnPage,
        this.searchTitle,
        true
      )
      .then((res) => {
        const articles = Object.values(res);

        this.mainPageArticlesContainer.innerHTML = '';

        articles.forEach((article) => {
          const { title, desc, authorID, _id } = article;
          let imgUrl = '/img/nophoto.png';
          article.data.blocks.forEach((block) => {
            if (block.type === 'image') {
              imgUrl = block.data.file.url;
              return undefined;
            }
          });
          const DOMElement = pageRender.getDOMElemets(
            createArticleMainPageItem(title, authorID, desc, _id, imgUrl)
          );
          this.mainPageArticlesContainer.append(DOMElement);
        });
      });
  },
  async articlesUserPageAddToDOM() {
    await this.getMaxArticleCount();
    changeBtnAvailable();
    let articles = await listItemBehavior.getArticlesList(
      loginCheck.userID,
      this.pageNumber,
      this.articlesLimitOnPage,
      undefined,
      true
    );
    articles = Object.values(articles);
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
    const URL = loginCheck.fetchURL;
    let title = this.searchTitle;
    let authorID = loginCheck.userID;
    const isLatest = `&isLatest=true`;
    if (title !== '') title = `title=${title}`;
    if (this.currentPage !== 'main') {
      authorID = `authorID=${authorID}`;
    } else {
      authorID = '';
    }

    const url = `${URL}articles?${title}${authorID}${isLatest}`;
    const res = await fetch(`${url}`).then((response) => response.json());
    this.numberOfArticles = res.data.count;
    this.maxPagesCount = Math.ceil(
      this.numberOfArticles / this.articlesLimitOnPage
    );
  },
};

export default pageRender;
