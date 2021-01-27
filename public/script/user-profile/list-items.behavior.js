const listItemBehavior = {
  artilesID: [],
  selectingState: false,
  changeSettings: '',
  selectArticle(e) {
    const checkbox = e.target;
    const article = checkbox.parentNode;
    const articleID = article.dataset.articleid;

    this.highlightSelectedArticle(article);
    if (checkbox.checked) {
      this.addIDToStack(articleID);
    } else {
      this.deleteIDFromStack(articleID);
    }
    this.toggleMainDeleteBtnState();
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
      this.artilesID.push(articleID);
    } else {
      const id = this.getArticleID(articleID);
      this.artilesID.push(id);
    }
  },
  deleteIDFromStack(articleID) {
    if (this.selectingState) {
      const index = this.artilesID.indexOf(articleID);
      if (index > -1) {
        this.artilesID.splice(index, 1);
      }
    } else {
      this.artilesID = [];
    }
  },
  toggleMainDeleteBtnState() {
    const mainDeleteBtn = document.querySelector('.main-delete-btn');
    if (mainDeleteBtn.hasAttribute('disabled')) {
      mainDeleteBtn.removeAttribute('disabled');
      this.changeSelectingState();
      this.toggleArticlesDeleteBtns();
    } else if (this.artilesID.length === 0) {
      mainDeleteBtn.setAttribute('disabled', 'disabled');
      this.changeSelectingState();
      this.toggleArticlesDeleteBtns();
    }
  },
  toggleArticlesDeleteBtns() {
    const buttons = document.querySelectorAll('.article-delete-btn');
    buttons.forEach((button) => {
      if (this.selectingState) {
        button.setAttribute('disabled', 'disabled');
      } else {
        button.removeAttribute('disabled');
      }
    });
  },
  changeSelectingState() {
    this.selectingState = !this.selectingState;
  },
  deleteArticlesFromServer() {
    //   создания запроса на удаление статей
    alert(`Удалить статьи  ${this.artilesID}`);
  },
  openArticle(e) {
    //   открыть статью
    const id = this.getArticleID(e);
    alert(`открыть статью ${id}`);
  },
  editArticle(e) {
    const id = this.getArticleID(e);
    alert(`изменить статью ${id}`);
  },
  createNewArticle() {
    alert('создание новой статьи');
  },
  deleteProfile() {
    alert('Удалить профиль');
  },
  changeUserSettings() {
    const setting = this.changeSettings;
    const { value } = document.querySelector('.change-value');
    alert(`изменить ${setting} на '${value}'`);
  },
};
