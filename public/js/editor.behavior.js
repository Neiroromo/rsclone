import pageRender from './page-render.js';
import loginCheck from './loginCheck.js';

function lengthInUtf8Bytes(str) {
  // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
  let m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

const editor = {
  editor: undefined,
  editorOn: false,
  articleID: null,
  pageState: 'read',
  saveBtn: document.querySelector('.open-save-modal'),
  discardBtn: document.querySelector('.open-discard-modal'),
  editBtn: document.querySelector('.switch-to-edit'),
  editorJSWorkspace: document.querySelector('.workspace__body'),
  titleInput: document.querySelector('.edit-article-title'),
  descTextAria: document.querySelector('#article-desc'),
  changedArticlesContainer: document.querySelector('.changed-articles'),
  openedData: null,
  updatedVariables() {
    this.saveBtn = document.querySelector('.open-save-modal');
    this.discardBtn = document.querySelector('.open-discard-modal');
    this.editBtn = document.querySelector('.switch-to-edit');
    this.editorJSWorkspace = document.querySelector('.workspace__body');
    this.titleInput = document.querySelector('.edit-article-title');
    this.descTextAria = document.querySelector('#article-desc');
    this.changedArticlesContainer = document.querySelector('.changed-articles');
  },
  turnOnEditor() {
    this.editorJSWorkspace.innerHTML = '';
    this.editorOn = true;
    this.pageState = 'edit';

    this.saveBtn.classList.remove('d-none');
    this.discardBtn.classList.remove('d-none');
    this.editBtn.classList.add('d-none');
    this.titleInput.removeAttribute('disabled');

    this.createEditor();

    this.editor.isReady.then(() => {
      this.editor.render(this.openedData);
    });
  },
  turnOffEditor() {
    this.editor.destroy();

    this.editorJSWorkspace.innerHTML = '';
    this.editorOn = false;
    this.pageState = 'read';

    this.saveBtn.classList.add('d-none');
    this.discardBtn.classList.add('d-none');
    this.editBtn.classList.remove('d-none');
    this.titleInput.setAttribute('disabled', 'disabled');

    this.enableReadMode(this.openedData);
  },
  saveArticle() {
    const userChangedID = loginCheck.userID;
    const title = document.querySelector('.edit-article-title').value;
    const desc = document.querySelector('#article-desc').value;
    const date = new Date();
    this.editor
      .save()
      .then(async (outputData) => {
        console.log('Article data: ', outputData);
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
        console.log('save:');
        console.log(save);
        const response = await fetch('http://127.0.0.1:8000/api/v1/articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(save),
        });
      })
      .catch((error) => {
        console.log('Saving failed: ', error);
      });
  },
  getArticle(articleID) {},
  async openArticle(articleID) {
    if (articleID === null) return;
    // получение данных статьи
    const url = `http://localhost:8000/api/v1/articles?_id=${articleID}`;
    const res = await fetch(`${url}`).then((response) => response.json());
    const article = { ...res.articles[0] };
    console.log(article);
    // добавление заголовка
    this.titleInput.value = article.title;
    // добавление описания
    this.descTextAria.value = article.desc;
    // добавление тела статьи
    this.openedData = article.data;
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
              byFile: 'http://localhost:8000/api/v1/articles/upload',
              byUrl: 'http://localhost:8000/fetchUrl',
            },
          },
        },
        raw: RawTool,
        imageSimple: {
          class: SimpleImage,
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        embed: Embed,
        quote: Quote,
      },
      // readOnly: true,
      placeholder: 'Let`s write an awesome story!',
      data: this.openedData,
    });
    this.editor = editor;
  },
  addChangedArticles() {},
  enableReadMode(data) {
    this.editorOn = false;
    const parser = new edjsParser();
    const markup = parser.parse(data);
    this.editorJSWorkspace.innerHTML = '';
    this.editorJSWorkspace.innerHTML = markup;
  },
};

export default editor;
