//const fetch = require('node-fetch');

const searchForm = document.querySelector('#searchForm');
const listArticle = document.querySelectorAll('.list-article a');
const btnSearch = document.querySelector('.btn-search');
const divArticle = document.querySelector('.list-article');

async function searchArticle(req, res) {
  const searchText = searchForm.value.trim().replace(/ /g, '+');

  try {
    let urlSearch;
    divArticle.innerHTML = '';
    if (searchText !== '') {
      urlSearch = `http://localhost:8000/api/v1/articles?title=${searchText}`;
    } else {
      urlSearch = 'http://localhost:8000/api/v1/articles/';
      console.log('hello');
    }

    const result = await fetch(urlSearch);
    const data = await result.json();
    console.log(data);
    const allArt = data.data.articles;
    console.log(allArt);

    for (let i = 0; i < allArt.length; i += 1) {
      divArticle.innerHTML += `<a href="#" class="list-group-item list-group-item-action flex-column align-items-start mt-1 mb-1">
                                    <div class="d-flex w-100 justify-content-between">
                                      <h5 class="mb-1">${allArt[i].title}</h5>
                                      <small>${allArt[i].author}</small>
                                    </div>
                                  <p class="mb-1">${allArt[i].desc}</p>
                                </a>`;
    }

    /*res.render('articles', {
      allArticles: allArt,
    });*/
  } catch (err) {
    console.log(err);
  }
}

//searchForm.addEventListener('input', searchArticle);
btnSearch.addEventListener('click', searchArticle);


/*if (searchText !== '') {
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
}*/