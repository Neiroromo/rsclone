const Article = require('../models/articlesModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.showAllArticles = catchAsync(async (req, res) => {
  console.log(req.cookies.user);
  console.log(req.query);
  const features = new APIFeatures(Article.find(), req.query)
    .filter()
    .sort()
    .limitField()
    .paginate();
  const articles = await features.query;
  res.json({
    status: 'OK',
    articles,
  });
});

exports.createArticle = catchAsync(async (req, res) => {
  const article = await Article.create({
    name: req.body.name,
    author: req.body.author,
    category: req.body.category,
    article: req.body.article,
    views: req.body.views,
  });

  res.json({
    status: 'OK',
    createdArticle: article,
  });
});

exports.getOneArticle = catchAsync(async (req, res, next) => {
  const article = await Article.findOne({ name: req.params.name });

  if (!article) {
    return next(new AppError('Данной статьи  не существует', 404));
  }
  res.status(200).json({
    status: 'success',
    article,
  });
});

exports.updateArticle = catchAsync(async (req, res) => {
  const article = await Article.findOneAndUpdate(req.params.name, req.body, {
    new: true,
    runValidators: true,
  });
  res.status('200').json({
    result: 'success',
    article,
  });
});

exports.deleteArticle = catchAsync(async (req, res) => {
  const article = await Article.findOneAndDelete(req.params.name);
  res.status(201).json({
    status: 'success',
    article,
  });
});
