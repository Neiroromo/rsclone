export default function createSearch() {
  const html = `<div class="d-flex w-100 justify-content-between mt-5 mb-5">
    <div class="input-group">
      <input type="text" class="form-control rounded-0" placeholder="Search" id="searchForm">
      <span class="input-group-btn">
        <button class="btn btn-secondary btn-confirm btn-lg btn-search rounded-0" type="button">Go!</button>
      </span>
    </div>
  </div>`;
  return html;
}
