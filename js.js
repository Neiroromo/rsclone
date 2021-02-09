.then((res) => {
    const articles = Object.values(res);
    console.log(articles);
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
  }


  export default function createArticleMainPageItem(
    title,
    author,
    desc,
    articleID,
    imgUrl
  ) {
    const html = `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start mt-1 mb-1 mainPage-openArticle-btn" data-articleID="${articleID}"><div style="display:flex; justify-content: space-between"><div style="align-self: center;"> <div class="d-flex w-100 justify-content-between" unclickable> <h5 class="mb-1" unclickable>${title}</h5> <small unclickable></small> </div><p class="mb-1" unclickable>${desc}</p></div><img src=${imgUrl} style="width:100px"></img></div></a>`;
    return html;
  }