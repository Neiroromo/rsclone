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
  const features = new APIFeatures(
    Article.find({
      title: { $regex: `${req.body.title}`, $options: 'i' },
    }),
    req.query
  )
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
    message: 'Все статьи',
    articles,
  });
});

exports.createArticle = catchAsync(async (req, res) => {
  console.log(`createArticle`);
  const token = req.cookies.jwt;
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
  const currentUser = await User.findById(decoded.id);
  const userChangedID = currentUser._id;
  const { fileSize } = req.body;
  let { articleID } = req.body;
  let authorID;
  let isLatest = true;
  const changes = fileSize;
  if (articleID === null) {
    articleID =
      (await Article.find({}).sort({ articleID: 1 }).limit(1).articleID) + 1;
    authorID = currentUser._id;
  } else {
    authorID = await Article.findById(articleID).authorID;
  }

  const articles = await Article.create({
    articleID,
    authorID,
    userChangedID,
    title: req.body.title,
    desc: req.body.desc,
    data: req.body.outputData,
    isLatest,
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

exports.getMaxById = catchAsync(async (req, res, next) => {
  console.log('hello');
  let articles;
  if (req.params.id === '*') {
    articles = await Article.countDocuments({}, (err, count) => {
      console.log('Number of docs: ', count);
    });
    console.log('hello1');
  } else if (req.params.id) {
    console.log(typeof req.params.id);
    articles = await Article.find({
      authorID: { $eq: req.params.id },
    }).count((err, count) => {
      console.log('Number of docs: ', count);
    });
  }

  res.status(200).json({
    maxCount: articles,
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
    message: 'Выбранные статьи удалены!!!',
  });
});
