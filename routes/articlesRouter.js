const express = require('express');
const articlesController = require('../controllers/articlesController');

const articleRouter = express.Router();

articleRouter
  .route('/')
  .get(articlesController.showAllArticles)
  .post(articlesController.createArticle);
module.exports = articleRouter;

articleRouter
  .route('/:name')
  .get(articlesController.getOneArticle)
  .delete(articlesController.deleteArticle)
  .patch(articlesController.updateArticle);
