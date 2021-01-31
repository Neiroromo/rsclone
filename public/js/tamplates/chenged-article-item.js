export default function createChangedArticleItem(
  articleID,
  userName,
  date,
  size,
  textClass
) {
  const html = `<tr data-changedArticleID="${articleID}">
    <td>${userName}</td>
    <td>${date}</td>
    <td class="${textClass}">${size}</td>
  </tr>`;
  return html;
}
