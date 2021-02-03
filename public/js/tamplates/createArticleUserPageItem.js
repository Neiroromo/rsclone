export default function createArticleUserPageItem(name, desc, _id) {
  const articleHTML = `<li class=" list-group-item article-item" data-articleID="${_id}" > <input type="checkbox" class=" col-1 article-checkbox" > <div class='col-9 col-md-10 article-data open-article-elem'> <div class=" article-name open-article-elem"> ${name}</div><div class=" article-desc open-article-elem"> ${desc}</div></div><button class="col-2 col-md-1 btn btn-outline-danger article-delete-btn" data-toggle="modal" data-target="#deleteArticle"> <span class="material-icons"> delete </span> </button> </li>`;
  return articleHTML;
}

/* <button class="col-1 btn btn-outline-warning article-edit-btn">
          <span class="material-icons">
              create
          </span>
      </button> */
