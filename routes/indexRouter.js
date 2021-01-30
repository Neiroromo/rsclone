const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const urlAllArticles = 'http://localhost:8000/api/v1/articles/';
    const result = await fetch(urlAllArticles);
    const data = await result.json();
    const allArt = data.data.articles;

    res.render('main', {
      allArticles: allArt,
    });
  } catch (err) {
    console.log(err);
  }
};
