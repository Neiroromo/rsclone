export default function createArticleMainPageItem(
  title,
  author,
  desc,
  articleID
) {
  const html = `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start mt-1 mb-1 mainPage-openArticle-btn" data-articleID="${articleID}"> <div class="d-flex w-100 justify-content-between" unclickable> <h5 class="mb-1" unclickable>${title}</h5> <small unclickable></small> </div><p class="mb-1" unclickable>${desc}</p></a>`;
  return html;
}
