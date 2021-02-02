export default function createChangedArticleItem(
  articleID,
  userName,
  date,
  size,
  textClass,
  currentPageClass
) {
  const html = `<tr class='open-changed-article ${currentPageClass}' data-changedArticleID="${articleID}">
    <td>${userName}</td>
    <td>${date}</td>
    <td class="${textClass}">${size}</td>
  </tr>`;
  return html;
}
