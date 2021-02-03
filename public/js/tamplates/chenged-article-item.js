export default function createChangedArticleItem(
  number,
  articleID,
  userName,
  date,
  size,
  textClass,
  currentPageClass
) {
  let deleteUserHighlight = '';
  if (userName === undefined) {
    userName = 'пользователь удален';
    deleteUserHighlight = 'text-danger';
  }
  const html = `<tr class='open-changed-article ${currentPageClass}' data-changedArticleID="${articleID}"> <td>${number}</td><td class='${deleteUserHighlight}'>${userName}</td><td style='min-width: 96px;'>${date}</td><td class="${textClass}">${size}</td></tr>`;
  return html;
}
