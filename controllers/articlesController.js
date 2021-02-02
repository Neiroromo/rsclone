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
  console.log(`showAllArticles:`);

  let query;
  if (!req.query.title) {
    query = '';
  } else {
    query = req.query.title;
  }

  const features = new APIFeatures(
    Article.find({
      title: { $regex: `${query}`, $options: 'i' },
    }),
    req.query
  )
    .filter()
    .sort()
    .limitField()
    .paginate();

  const articles = await features.query;
  const count = await features.query.countDocuments({});
  res.json({
    status: 'OK',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    data: {
      articles,
      count,
    },
    message: 'Все статьи',
    articles,
  });
});

exports.createArticle = catchAsync(async (req, res, next) => {
  console.log(`создание статьи`);
  // const token = req.cookies.jwt;
  // const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
  // console.log('aaa');
  // const currentUser = await User.findById(decoded.id);
  const currentUser = req.body.userChangedID;
  // const userChangedID = currentUser._id;
  const userChangedID = currentUser;
  const { fileSize } = req.body;
  const { _id } = req.body;
  let authorID;
  let articleID;
  const isLatest = true;
  const changes = fileSize;

  async function create() {
    console.log('asdasd', {
      articleID,
      authorID,
      userChangedID,
      title: req.body.title,
      desc: req.body.desc,
      data: req.body.outputData,
      isLatest,
      date: req.body.date,
      changes,
    });
    const article = await Article.create({
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
    res.json({
      status: 'OK',
      createdArticle: article,
    });
  }

  if (_id === null) {
    const article = await Article.find({}).sort({ articleID: -1 }).limit(1);
    if (article.length === 0) {
      articleID = 1;
    } else {
      articleID = article[0].articleID + 1;
    }

    console.log('article id is ', articleID);
    authorID = currentUser;
    console.log({
      articleID,
      authorID,
      userChangedID,
      title: req.body.title,
      desc: req.body.desc,
      data: req.body.outputData,
      isLatest,
      date: req.body.date,
      changes,
    });
    create();
  } else {
    console.log('изменение старой статьи');
    let oldTitle, oldDesc, oldData;

    await Article.findById(_id, function (err, article) {
      authorID = article.authorID;
      articleID = article.articleID;
    });
    const article = await Article.find(
      { _id: { $eq: _id } },
      async (err, article) => {
        const articleIden = article[0].articleID;

        await Article.find(
          { articleID: { $eq: articleIden }, isLatest: { $eq: true } },
          async (err, article) => {
            ({ oldTitle, oldDesc, oldData } = {
              oldTitle: article[0].title,
              oldDesc: article[0].desc,
              oldData: article[0].data,
            });

            if (
              req.body.title === oldTitle &&
              req.body.desc === oldDesc &&
              JSON.stringify(req.body.outputData) === JSON.stringify(oldData)
            ) {
              return next(
                new AppError('Статья с данным содержанием уже существует', 401)
              );
            } else {
              await Article.findOneAndUpdate(
                { _id: `${_id}` },
                { isLatest: false }
              );
              create();
            }
          }
        );
      }
    );
  }
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
    }).countDocuments((err, count) => {
      console.log('Number of docs: ', count);
    });
  }

  res.status(200).json({
    maxCount: articles,
  });
});

exports.getOneArticle = catchAsync(async (req, res, next) => {
  console.log('Показать одну статью');
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

exports.getArticlesById = catchAsync(async (req, res) => {
  const article = await Article.findById(req.body._id);
  const articles = await Article.find({
    articleID: { $eq: article.articleID },
  });
  res.json({
    message: 'success',
    articles,
  });
});

exports.deleteArticle = catchAsync(async (req, res) => {
  console.log('delete: ', req.body);
  const arrayId = req.body;
  arrayId.forEach(async (id) => {
    const article = await Article.findById(id);
    const deleteId = article.articleID;
    await Article.deleteMany({ articleID: { $eq: deleteId } });
  });
  return res.status(201).json({
    message: 'Выбранные статьи удалены!!!',
  });
});
