const divPagination = document.querySelector('#divPagination');
const firstPage = document.querySelector('.first-page');
const prevPage = document.querySelector('.first-page');
const currentPage = document.querySelector('.first-page');
const nextPage = document.querySelector('.first-page');
const lastPage = document.querySelector('.first-page');

async function pagination (artPerPage, countArticles) {
  const countPages = Math.ceil(countArticles / artPerPage);
  let urlPagination;
  if (countPages > 1) {
    urlPagination = `http://localhost:8000/api/v1/articles?page=1&limit=${artPerPage}`;
  } else {
    urlPagination = `http://localhost:8000/api/v1/articles?page=1&limit=${artPerPage}`;
    divPagination.setAttribute('hidden');
  }
}