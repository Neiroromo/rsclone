export default function createChangedArticleItem(
  number,
  articleID,
  userName,
  date,
  size,
  textClass,
  currentPageClass
) {
  if (userName === undefined) userName = 'пользователь удален';
  const html = `<tr class='open-changed-article ${currentPageClass}' data-changedArticleID="${articleID}"> <td>${number}</td><td>${userName}</td><td>${date}</td><td class="${textClass}">${size}</td></tr>`;
  return html;
}
