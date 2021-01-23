const searchForm = document.querySelector('#searchForm');
const listArticle = document.querySelectorAll('.list-article a');
const btnSearch = document.querySelector('.btn-search');

function searchArticle() {
  const searchText = searchForm.value.trim().toLowerCase();
  if (searchText !== '') {
    listArticle.forEach((element) => {
      if (element.textContent.toLowerCase().search(searchText) === -1) {
        element.classList.add('hide-article');
      } else {
        element.classList.remove('hide-article');
      }
    });
  } else {
    listArticle.forEach((element) => {
      element.classList.remove('hide-article');
    });
  }
}

searchForm.addEventListener('input', searchArticle);
btnSearch.addEventListener('click', searchArticle);
