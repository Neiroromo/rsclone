const express = require('express');
const articlesController = require('../controllers/articlesController');
const authController = require('../controllers/authController');
const articleRouter = express.Router();

articleRouter
  .route('/')
  // .get(authController.protect, articlesController.showAllArticles) // нужно ввойти и получить куки , тогда будет доступ
  .get(articlesController.showAllArticles) // Не нужно ввойти и получить куки
  .post(articlesController.createArticle);

articleRouter.get('/:id', articlesController.getMaxById);
articleRouter.post('/getArticlesById', articlesController.getArticlesById);
articleRouter
  .route('/:name')
  .get(articlesController.getOneArticle)
  .delete(articlesController.deleteArticle)
  .patch(articlesController.updateArticle);

articleRouter.route('/upload').post(
  // authController.protect,
  articlesController.uploadArticlePhoto,
  (req, res, next) => {
    console.log(req.file);
    res.json({
      success: 1,
      file: {
        url: `http://127.0.0.1:8000/img/articles/${req.file.filename}`,
      },
    });
  }
);

module.exports = articleRouter;
