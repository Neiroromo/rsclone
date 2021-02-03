export default function createSearch() {
  const html = ` <div class="d-flex w-100 justify-content-between mt-5 mb-5 search-block"> <div class="globe-image"> <img src="./img/wikilogo.png" alt=""> </div><div class="input-group"> <input type="text" class="form-control rounded-0" placeholder="Название статьи" id="searchForm"> <span class="input-group-btn"> <button class="btn btn-secondary btn-confirm btn-lg btn-search rounded-0" type="button">найти</button> </span> </div></div>`;
  return html;
}
