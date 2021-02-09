import pageRender from './page-render.js';

export default function changeBtnAvailable() {
  if (pageRender.pageNumber <= 1) {
    if (pageRender.maxPagesCount === 1 || pageRender.maxPagesCount === 0) {
      document
        .querySelector('.first-page')
        .classList.add('disabled', 'unclickable');
      document
        .querySelector('.prev-page')
        .classList.add('disabled', 'unclickable');
      document
        .querySelector('.next-page')
        .classList.add('disabled', 'unclickable');
      document
        .querySelector('.last-page')
        .classList.add('disabled', 'unclickable');
      document
        .querySelector('.first-page')
        .childNodes[1].classList.remove('font-weight-bold');
      document
        .querySelector('.prev-page')
        .childNodes[1].classList.remove('font-weight-bold');
      document
        .querySelector('.next-page')
        .childNodes[1].classList.remove('font-weight-bold');
      document
        .querySelector('.last-page')
        .childNodes[1].classList.remove('font-weight-bold');
    } else {
      document
        .querySelector('.first-page')
        .classList.add('disabled', 'unclickable');
      document
        .querySelector('.prev-page')
        .classList.add('disabled', 'unclickable');
      document
        .querySelector('.first-page')
        .childNodes[1].classList.remove('font-weight-bold');
      document
        .querySelector('.prev-page')
        .childNodes[1].classList.remove('font-weight-bold');

      document
        .querySelector('.last-page')
        .classList.remove('disabled', 'unclickable');
      document
        .querySelector('.next-page')
        .classList.remove('disabled', 'unclickable');
      document
        .querySelector('.last-page')
        .childNodes[1].classList.add('font-weight-bold');
      document
        .querySelector('.next-page')
        .childNodes[1].classList.add('font-weight-bold');
    }
    document.querySelector('.current-page').innerHTML = '1';
  } else if (pageRender.pageNumber >= pageRender.maxPagesCount) {
    document
      .querySelector('.next-page')
      .classList.add('disabled', 'unclickable');
    document
      .querySelector('.last-page')
      .classList.add('disabled', 'unclickable');
    document
      .querySelector('.next-page')
      .childNodes[1].classList.remove('font-weight-bold');
    document
      .querySelector('.last-page')
      .childNodes[1].classList.remove('font-weight-bold');

    document
      .querySelector('.first-page')
      .classList.remove('disabled', 'unclickable');
    document
      .querySelector('.prev-page')
      .classList.remove('disabled', 'unclickable');
    document
      .querySelector('.first-page')
      .childNodes[1].classList.add('font-weight-bold');
    document
      .querySelector('.prev-page')
      .childNodes[1].classList.add('font-weight-bold');

    document.querySelector(
      '.current-page'
    ).innerHTML = `${pageRender.maxPagesCount}`;
  } else {
    document
      .querySelector('.first-page')
      .classList.remove('disabled', 'unclickable');
    document
      .querySelector('.prev-page')
      .classList.remove('disabled', 'unclickable');
    document
      .querySelector('.next-page')
      .classList.remove('disabled', 'unclickable');
    document
      .querySelector('.last-page')
      .classList.remove('disabled', 'unclickable');

    document
      .querySelector('.first-page')
      .childNodes[1].classList.add('font-weight-bold');
    document
      .querySelector('.prev-page')
      .childNodes[1].classList.add('font-weight-bold');
    document
      .querySelector('.next-page')
      .childNodes[1].classList.add('font-weight-bold');
    document
      .querySelector('.last-page')
      .childNodes[1].classList.add('font-weight-bold');

    document.querySelector(
      '.current-page'
    ).innerHTML = `${pageRender.pageNumber}`;
  }
}
