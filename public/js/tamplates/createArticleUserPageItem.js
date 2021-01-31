export default function createArticleUserPageItem(name, desc) {
  const articleHTML = `<li class=" list-group-item article-item" data-articleID="${name}" >
      <input type="checkbox" class="col-1 article-checkbox" >
      <div class="col-2 article-name open-article-elem">
          ${name}
      </div>
      <div class="col-7 article-desc open-article-elem">
          ${desc}
      </div>
      <button class="col-1 btn btn-outline-warning article-edit-btn">
          <span class="material-icons">
              create
          </span>
      </button>
      <button class="col-1 btn btn-outline-danger article-delete-btn" data-toggle="modal" data-target="#deleteArticle">
          <span class="material-icons">
              delete
          </span>
      </button>
  </li>`;
  return articleHTML;
}
