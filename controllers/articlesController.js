const Article = require('../models/articlesModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.showAllArticles = catchAsync(async (req, res) => {
  console.log(`showAllArticles: ${req.query}`);
  const features = new APIFeatures(Article.find(), req.query)
    .filter()
    .sort()
    .limitField()
    .paginate();
  const articles = await features.query;
  res.json({
    status: 'OK',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    data: {
      articles,
    },
    message: 'you watch me!',
  });
});

exports.createArticle = catchAsync(async (req, res) => {
  console.log(`createArticle: ${req.body}`);
  const articles = await Article.create({
    userID: req.body.userID,
    title: req.body.title,
    // data: asd статья
  });

  res.json({
    status: 'OK',
    data: {
      articles,
    },
    message: 'you watch me!',
  });
});

exports.getOneArticle = catchAsync(async (req, res, next) => {
  console.log(`getOneArticle: ${req.params.name}`);
  const article = await Article.findOne({ name: req.params.name });

  if (!article) {
    return next(new AppError('no article found with that name', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      article,
    },
  });
});

exports.updateArticle = catchAsync(async (req, res) => {
  console.log(`update: ${req}`);
  const article = await Article.findOneAndUpdate(req.params.name, req.body, {
    new: true,
    runValidators: true,
  });
  res.status('200').json({
    result: 'success',
    data: {
      article,
    },
  });
});

exports.deleteArticle = catchAsync(async (req, res) => {
  console.log('delete: ' + req.body);
  req.body.forEach(async (element) => {
    console.log('deleting now: ' + element);
    const article = await Article.findOneAndDelete(element);
  });
  res.status(201).json({
    status: 'success',
  });
});
