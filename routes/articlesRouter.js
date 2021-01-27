const express = require('express');
const articlesController = require('../controllers/articlesController');
const authController = require('../controllers/authController');

const articleRouter = express.Router();

articleRouter
  .route('/')
  .get(authController.protect, articlesController.showAllArticles)
  .post(articlesController.createArticle);
module.exports = articleRouter;

articleRouter
  .route('/:name')
  .get(articlesController.getOneArticle)
  .delete(articlesController.deleteArticle)
  .patch(articlesController.updateArticle);
