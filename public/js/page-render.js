import createSearch from './tamplates/search.js';
import createArticlesMainPageContainer from './tamplates/aricles-mainPage-container.js';
import createPagination from './tamplates/pagination.js';

const pageRender = {
  currentPage: 'main',
  pageState: 'read',
  pageContainer: document.querySelector('body'),
  renderContainer: document.querySelector('main'),
  mainPageArticlesContainer: document.querySelector('.list-article'),
  pageNumber: 1,
  articlesLimitOnPage: 10,
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
    }
    if (pagaName === 'userProfile') {
    }
    if (pagaName === 'articlePage') {
    }
  },
  getDOMElemets(html) {
    const htmlObj = new DOMParser().parseFromString(html, 'text/html');
    const DOMElemets = htmlObj.documentElement.lastChild.firstChild;
    return DOMElemets;
  },
  async articlesUserPageAddToDOM() {
    console.log('enter in addArticleListToDOM');
    let articles = await listItemBehavior.getArticlesList(
      this.userName,
      '1',
      this.articlesLimitOnPage
    );
    articles = Object.values(articles);
    const listContainer = document.querySelector('.articles-container');
    listContainer.innerHTML = '';
    articles.forEach((article) => {
      const { title, desc } = article;
      const userPageArticleDOM = this.getDOMElemets(
        createArticleItem(title, desc)
      );
      listContainer.append(userPageArticleDOM);
    });
  },
};

export default pageRender;
