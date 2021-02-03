export default function createPagination() {
  const html = `<div id="divPagination"> <nav aria-label="..." class="mt-5"> <ul class="pagination"> <li class="page-item disabled first-page"> <span class="page-link text-dark">&#60;&#60;</span> </li><li class="page-item disabled prev-page"> <a class="page-link text-dark"> &#60; </a> </li><li class="page-item active btn-confirm"> <span class="page-link btn-confirm current-page"> 1<span class="sr-only btn-confirm">(current)</span> </span> </li><li class="page-item next-page"> <a class="page-link text-dark font-weight-bold"> &#62; </a> </li><li class="page-item last-page"> <a class="page-link text-dark font-weight-bold"> &#62;&#62; </a> </li></ul> </nav> </div>`;
  return html;
}
