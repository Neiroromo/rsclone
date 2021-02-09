const express = require('express');
const articlesController = require('../controllers/articlesController');
const authController = require('../controllers/authController');
const articleRouter = express.Router();

articleRouter
  .route('/')
  .get(articlesController.showAllArticles) // Не нужно войти и получить куки
  .post(authController.protect, articlesController.createArticle)
  .delete(authController.protect, articlesController.deleteArticle);

articleRouter.get('/:id', articlesController.getMaxById);
articleRouter.post('/getArticlesById', articlesController.getArticlesById);
articleRouter
  .route('/:name')
  .get(articlesController.getOneArticle)
  .patch(articlesController.updateArticle);

articleRouter.route('/upload').post(
  // authController.protect,
  articlesController.uploadArticlePhoto,
  (req, res, next) => {
    console.log(req.file);
    res.json({
      success: 1,
      file: {
        url: `/img/articles/${req.file.filename}`,
      },
    });
  }
);

module.exports = articleRouter;
