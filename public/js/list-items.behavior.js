import pageRender from './page-render.js';

const listItemBehavior = {
  articlesID: [],
  selectingState: false,
  changeSettings: '',
  selectArticle(e) {
    const checkbox = e.target;
    const article = checkbox.parentNode;
    const articleID = article.dataset.articleid;

    if (checkbox.checked) {
      this.addIDToStack(articleID);
    } else {
      this.deleteIDFromStack(articleID);
    }
    this.highlightSelectedArticle(article);

    this.changeSelectingState();
    // this.toggleOpeningArticles();
  },
  getArticleID(e) {
    const elem = e.target;

    let parent = elem.parentNode;

    while (parent.tagName !== 'LI') {
      parent = parent.parentNode;
    }
    const articleID = parent.dataset.articleid;

    return articleID;
  },
  highlightSelectedArticle(article) {
    article.classList.toggle('selected');
  },
  addIDToStack(articleID) {
    if (typeof articleID === 'string') {
      this.articlesID.push(articleID);
    } else {
      const id = this.getArticleID(articleID);
      this.articlesID.push(id);
    }
    console.log('add to stack');
    console.log(articleID);
    console.log('stack rgtNow');
    console.log(this.articlesID);
  },
  deleteIDFromStack(articleID) {
    if (!articleID) return;
    console.log('delete from stack');
    console.log(articleID);
    console.log('stack rgtNow');
    console.log(this.articlesID);
    if (this.selectingState) {
      const index = this.articlesID.indexOf(articleID);
      if (index > -1) {
        this.articlesID.splice(index, 1);
      }
    } else {
      this.articlesID = [];
    }
  },
  toggleMainDeleteBtnState() {
    const mainDeleteBtn = document.querySelector('.main-delete-btn');
    if (mainDeleteBtn.hasAttribute('disabled')) {
      mainDeleteBtn.removeAttribute('disabled');
    } else {
      mainDeleteBtn.setAttribute('disabled', 'disabled');
    }
  },
  toggleArticlesBtns() {
    const buttons = document.querySelectorAll(
      '.article-delete-btn, .article-edit-btn'
    );
    buttons.forEach((button) => {
      if (this.selectingState) {
        button.setAttribute('disabled', 'disabled');
      } else {
        button.removeAttribute('disabled');
      }
    });
  },
  changeSelectingState() {
    const checkboxes = document.querySelectorAll('input:checked');
    if (
      (checkboxes.length > 0 && !this.selectingState) ||
      (checkboxes.length === 0 && this.selectingState)
    ) {
      this.selectingState = !this.selectingState;
      this.toggleArticlesBtns();
      this.toggleMainDeleteBtnState();
    }
  },
  async deleteArticlesFromServer() {
    if (this.articlesID.length === 0) return;
    console.log('stack rgtNow');
    console.log(this.articlesID);

    const articleTitles = this.articlesID;
    const response = await fetch(
      'http://127.0.0.1:8000/api/v1/articles/:name/',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleTitles),
      }
    ).then((res) => res.json());
    const { status } = response;
    this.articlesID = [];

    const click = new Event('click', {
      bubbles: true,
    });
    document.querySelector('.dismiss-delete-btn').dispatchEvent(click);
    pageRender.articlesUserPageAddToDOM();
    this.changeSelectingState();
  },
  openArticle(e) {
    //   открыть статью
    if (!this.selectingState) {
      const id = this.getArticleID(e);
      alert(`открыть статью ${id}`);
    }
  },
  editArticle(e) {
    const id = this.getArticleID(e);
    alert(`изменить статью ${id}`);
  },
  createNewArticle() {
    alert('создание новой статьи');
  },
  async deleteProfile() {
    alert('delete');
    // получить все статьи
    // let url = 'http://localhost:8000/api/v1/articles/';
    // let res = await fetch(`${url}`).then((response) => response.json());
    // let allArticles = { ...res.data.articles };
    // добавить статью
    // const save = {
    //   userID: 123,
    //   title: 'test add article title 5',
    //   desc: 'test add article description',
    // };
    // const response = await fetch('http://127.0.0.1:8000/api/v1/articles', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(save),
    // });
    // удалить статью
    // let articleTitle = { title: 'test add article title' };
    // let response = await fetch('http://127.0.0.1:8000/api/v1/articles/:name/', {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(articleTitle),
    // });
    // // обновить статью
    // const articleTitle = {
    //   name: 'test add article title 5',
    //   title: 'updated title',
    // };
    // await fetch('http://127.0.0.1:8000/api/v1/articles/:name/', {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(articleTitle),
    // });
  },
  changeUserSettings() {
    const setting = this.changeSettings;
    const { value } = document.querySelector('.change-value');
    alert(`изменить ${setting} на '${value}'`);
  },
  async getArticlesList(author, page, limitOnPage, title) {
    // если автор указан как *, то выводит все статьи
    // если страницы указаны как * или 0, то выводит все статьи с указанным автором
    console.log('enter in getArticles');
    if (author === '*') {
      author = '';
    } else {
      author = `authorID=${author}&`;
    }
    if (page === '*' || page === 0) {
      page = '';
      limitOnPage = '';
    } else {
      page = `page=${page}&limit=${limitOnPage}`;
    }
    if (title === undefined) title = '';
    console.log(author, page, limitOnPage, title);
    const url = `http://localhost:8000/api/v1/articles?${author}${page}&title=${title}`;
    const res = await fetch(`${url}`).then((response) => response.json());
    console.log(res);
    console.log('данные фетча', res);
    const allArticles = { ...res.data.articles };
    console.log('данные парсинга', allArticles);
    return allArticles;
  },
};

export default listItemBehavior;
