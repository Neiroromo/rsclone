import pageRender from './page-render.js';
import loginCheck from './loginCheck.js';
import createChangedArticleItem from './tamplates/chenged-article-item.js';

function lengthInUtf8Bytes(str) {
  // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
  let m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

const editor = {
  editor: undefined,
  editorOn: false,
  articleID: null,
  articleIDMain: null,
  pageState: 'read',
  saveBtn: document.querySelector('.open-save-modal'),
  discardBtn: document.querySelector('.open-discard-modal'),
  editBtn: document.querySelector('.switch-to-edit'),
  editorJSWorkspace: document.querySelector('.workspace__body'),
  viewResultBtn: document.querySelector('.see-article-inReadMode'),
  titleInput: document.querySelector('.edit-article-title'),
  descTextAria: document.querySelector('#article-desc'),
  changedArticlesContainer: document.querySelector('.changed-articles'),
  openedData: null,
  editingData: null,
  openedTitleDesc: {},
  editingTitleDesc: {},
  updatedVariables() {
    this.saveBtn = document.querySelector('.open-save-modal');
    this.discardBtn = document.querySelector('.open-discard-modal');
    this.editBtn = document.querySelector('.switch-to-edit');
    this.editorJSWorkspace = document.querySelector('.workspace__body');
    this.viewResultBtn = document.querySelector('.see-article-inReadMode');
    this.titleInput = document.querySelector('.edit-article-title');
    this.descTextAria = document.querySelector('#article-desc');
    this.changedArticlesContainer = document.querySelector('.changed-articles');
  },
  turnOnEditor(isNew) {
    this.editorJSWorkspace.innerHTML = '';
    this.editorOn = true;
    this.pageState = 'edit';

    this.saveBtn.classList.remove('d-none');
    this.discardBtn.classList.remove('d-none');
    this.viewResultBtn.classList.remove('d-none');
    this.viewResultBtn.children[0].innerHTML = 'visibility';
    this.editBtn.classList.add('d-none');
    this.titleInput.removeAttribute('disabled');

    this.createEditor();
    if (!isNew) {
      this.editor.isReady.then(() => {
        if (this.editingData === null) {
          this.editor.render(this.openedData);
        } else {
          this.editor.render(this.editingData);
        }
      });
    }
  },
  async turnOffEditor(resetChages) {
    await this.editor.save().then((outputData) => {
      this.editingData = outputData;
    });
    this.editingTitleDesc.title = this.titleInput.value;
    this.editingTitleDesc.desc = this.descTextAria.value;
    this.editor.destroy();

    this.editorJSWorkspace.innerHTML = '';
    this.editorOn = false;
    this.pageState = 'read';

    if (resetChages) {
      this.viewResultBtn.classList.add('d-none');
      this.viewResultBtn.children[0].innerHTML = 'visibility';
      this.editBtn.classList.remove('d-none');
    } else {
      this.viewResultBtn.children[0].innerHTML = 'create';
    }
    this.titleInput.setAttribute('disabled', 'disabled');
    this.saveBtn.classList.add('d-none');
    this.discardBtn.classList.add('d-none');

    // this.editBtn.classList.remove('d-none');
    // this.titleInput.setAttribute('disabled', 'disabled');

    if (resetChages) {
      this.enableReadMode(this.openedData);
      this.editingData = null;
      this.editingTitleDesc = {};
      this.titleInput.value = this.openedTitleDesc.title;
      this.descTextAria.value = this.openedTitleDesc.desc;
    } else {
      this.enableReadMode(this.editingData);
    }
  },
  saveArticle() {
    const userChangedID = loginCheck.userID;
    const title = this.titleInput.value;
    const desc = this.descTextAria.value;
    const date = new Date();
    if (title === '' || desc === '') {
      alert('Обязательные поля: Заголовок, описание');
      return;
    }
    this.editor
      .save()
      .then(async (outputData) => {
        const toCompare = {
          title,
          desc,
          outputData,
        };
        const fileSize = lengthInUtf8Bytes(JSON.stringify(toCompare));
        const save = {
          _id: this.articleID,
          userChangedID,
          title,
          desc,
          outputData,
          fileSize,
          date,
        };
        const response = await fetch(`${loginCheck.fetchURL}articles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(save),
        })
          .then((res) => res.json())
          .then((res) => {
            this.articleID = res.createdArticle._id;
            this.articleIDMain = res.createdArticle.articleID;
            pageRender.renderNewPage('articlePage');
          });
      })
      .then((res) => res.json())
      .catch((error) => {
        console.log('Saving failed: ', error);
      });
  },
  async openArticle(articleID) {
    if (articleID === null) return;
    // получение данных статьи
    const url = `${loginCheck.fetchURL}articles?_id=${articleID}`;
    const res = await fetch(`${url}`).then((response) => response.json());
    const article = { ...res.articles[0] };
    this.articleIDMain = article.articleID;
    // добавление заголовка
    this.titleInput.value = article.title;
    this.openedTitleDesc.title = article.title;
    // добавление описания
    this.descTextAria.value = article.desc;
    this.openedTitleDesc.desc = article.desc;
    // добавление тела статьи
    this.openedData = article.data;
    this.editingTitleDesc = {};
    this.editingData = null;

    this.enableReadMode(this.openedData);
    // this.editor.isReady.then(() => {
    //   this.editor.render(this.openedData);
    // });
  },
  createEditor() {
    const editor = new EditorJS({
      holderId: 'editorjs',
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: `${loginCheck.fetchURL}articles/upload`,
              // byUrl: 'http://localhost:8000/fetchUrl',
            },
          },
        },
        // raw: RawTool,
        // imageSimple: {
        //   class: SimpleImage,
        // },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        // linkTool: {
        //   class: LinkTool,
        //   config: {
        //     endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching
        //   },
        // },
        list: {
          class: List,
          inlineToolbar: true,
        },
        embed: Embed,
        quote: Quote,
      },
      // readOnly: true,
      placeholder: 'Let`s write an awesome story!',
      data: {},
    });
    this.editor = editor;
  },
  async getChangedArticles() {
    const articleID = this.articleIDMain;
    if (articleID === null) return;
    const url = `${loginCheck.fetchURL}articles?articleID=${articleID}&sort=date`;
    const res = await fetch(`${url}`).then((response) => response.json());
    const articles = { ...res.articles };
    this.addChangedArticles(articles);
  },
  async addChangedArticles(changedArticles) {
    changedArticles = Object.values(changedArticles);
    let i = changedArticles.length;
    let changesArray = [];
    for (let index = 0; index < changedArticles.length; index += 1) {
      changesArray.push(changedArticles[index].changes);
    }
    changesArray.reverse();
    let pushArr = [];
    pushArr.push(changesArray[0]);
    let changesTest = pushArr[0];
    for (let index = 1; index <= changesArray.length; index += 1) {
      let item = changesArray[index];
      if (item > changesTest) {
        //стал больше
        pushArr.push(item - changesTest);
      } else if (item < changesTest) {
        //меньше
        pushArr.push(item - changesTest);
      } else if (item === 0) {
        pushArr.push(0);
      }
      changesTest = item;
    }
    pushArr.reverse();

    for (let index = 0; index < changedArticles.length; index += 1) {
      const article = changedArticles[index];
      const { _id } = article;
      let { date, changes } = article;
      const userName = await this.getUserName(article.userChangedID);
      let textClass;
      if (pushArr[index] > 0) {
        textClass = 'text-success';
        changes = `+${pushArr[index]} Кбайт`;
      } else if (pushArr[index] < 0) {
        textClass = 'text-danger';
        changes = `${pushArr[index]} Кбайт`;
      } else if (pushArr[index] === 0) {
        textClass = 'text-secondary';
        changes = '+0 Кбайт';
      }
      date = new Date(date);
      let day = date.getDay().toString();
      if (day.length < 2) day = `0${day}`;
      let month = date.getMonth().toString();
      if (month.length < 2) month = `0${month}`;
      const year = date.getFullYear().toString();
      date = `${day}-${month}-${year}`;
      changesTest = article.changes;
      let trClass = '';
      if (_id === this.articleID) trClass = 'current-changed-page';
      this.changedArticlesContainer.innerHTML += createChangedArticleItem(
        i,
        _id,
        userName,
        date,
        changes,
        textClass,
        trClass
      );
      i -= 1;
    }
  },
  async getUserName(userID) {
    const url = `${loginCheck.fetchURL}users/${userID}`;
    const res = await fetch(`${url}`).then((response) => response.json());
    const user = { ...res.name };
    return user.name;
  },
  enableReadMode(data) {
    this.editorOn = false;
    const parser = new edjsParser();
    const markup = parser.parse(data);
    this.editorJSWorkspace.innerHTML = '';
    this.editorJSWorkspace.innerHTML = markup;
    setTimeout(this.normalizeRender, 50);
  },
  normalizeRender() {
    const fullWidthImgs = document.querySelectorAll('.img-fullwidth');
    fullWidthImgs.forEach((img) => {
      img.style.height = 'auto';
      img.style.height = `${img.offsetHeight}px`;
    });
  },
};

export default editor;
