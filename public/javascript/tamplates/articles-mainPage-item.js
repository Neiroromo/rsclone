export default function createArticleMainPageItem(title, author, desc) {
  const html = `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start mt-1 mb-1">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${title}</h5>
      <small>${author}</small>
    </div>
    <p class="mb-1">${desc}</p>
  </a>`;
  return html;
}
