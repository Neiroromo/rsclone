const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (user) {
    user.password = undefined;
    res.locals.user = user;
    res.cookie('user', user);
  }
  res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });
  createSendToken(newUser, 201, res);
});

exports.restrictTo = (...roles) => {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('У вас нет прав для данного действия', 403));
    }
    next();
  };
};

exports.login = catchAsync(async (req, res, next) => {
  console.log(req.body);
  if (!req.body.email || !req.body.password) {
    console.log('wtd');
    return next(
      new AppError('Пожалуйста введите коректную почту и пароль', 400)
    );
  }

  const { password } = req.body;
  const { email } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Неправильный логин или пароль', 401));
  }
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  req.cookie('jwt', 'undefined', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  // eslint-disable-line consistent-return
  const token = req.cookies.jwt;
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError('Данного пользователя больше не существует'), 401);
  }
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'Пользователь поменял пароль, пожалуйста войдите на сайт заново'
      ),
      401
    );
  }

  req.user = freshUser;
  console.log(req.user);
  next();
});
