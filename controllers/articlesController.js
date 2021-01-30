const Article = require('../models/articlesModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/articles');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user--${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Неверный формат файла', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadArticlePhoto = upload.single('image');

exports.showAllArticles = catchAsync(async (req, res) => {
  console.log(`showAllArticles: ${req.query}`);
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
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    data: {
      articles,
    },
    message: 'you watch me!',
    articles,
  });
});

exports.createArticle = catchAsync(async (req, res) => {
  console.log(`createArticle`);

  const { userChangedID, fileSize } = req.body;
  let { articleID } = req.body;
  let authorID;
  const changes = fileSize;
  if (articleID === null) {
    // найти максимальный articleID в БД и articleID = maxDBArticleID + 1
    articleID = 1; //!! изменить
    authorID = userChangedID;
  } else {
    // найти автора статьи с articleID
    authorID = 'old author';
  }

  const articles = await Article.create({
    articleID,
    authorID,
    userChangedID,
    title: req.body.title,
    desc: req.body.desc,
    data: req.body.outputData,
    date: req.body.date,
    changes,
  }).catch((error) => {
    console.log(error);
  });
  // console.log(req.file);
  res.json({
    status: 'OK',
    createdArticle: article,
  });
});

exports.getOneArticle = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const article = await Article.findOne({ _id: req.params.name });

  if (!article) {
    return next(new AppError('Данной статьи  не существует', 404));
  }
  res.status(200).json({
    status: 'success',
    article,
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
    article,
  });
});

exports.deleteArticle = catchAsync(async (req, res) => {
  console.log('delete: ' + req.body);
  req.body.forEach(async (element) => {
    console.log('deleting now: ' + element);
    const article = await Article.findOneAndDelete({ title: element });
    console.log('deleted: ' + article);
  });
  res.status(201).json({
    status: 'success',
  });
});
