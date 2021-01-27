"use strict";

var _require = require('util'),
    promisify = _require.promisify;

var jwt = require('jsonwebtoken');

var User = require('../models/usersModel');

var catchAsync = require('../utils/catchAsync');

var AppError = require('../utils/appError');

var signToken = function signToken(id) {
  return jwt.sign({
    id: id
  }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

var createSendToken = function createSendToken(user, statusCode, res) {
  var token = signToken(user._id);
  var cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if (user) {
    user.password = undefined;
    res.locals.user = user;
    res.cookie('user', user);
  }

  res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).json({
    status: 'success',
    token: token,
    data: {
      user: user
    }
  });
};

exports.signup = catchAsync(function _callee(req, res) {
  var newUser;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.create({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            passwordChangedAt: req.body.passwordChangedAt
          }));

        case 2:
          newUser = _context.sent;
          createSendToken(newUser, 201, res);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});

exports.restrictTo = function () {
  for (var _len = arguments.length, roles = new Array(_len), _key = 0; _key < _len; _key++) {
    roles[_key] = arguments[_key];
  }

  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('У вас нет прав для данного действия', 403));
    }

    next();
  };
};

exports.login = catchAsync(function _callee2(req, res, next) {
  var _req$body, email, password, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;

          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", next(new AppError('Пожалуйста введите коректную почту и пароль'), 400));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).select('+password'));

        case 5:
          user = _context2.sent;
          _context2.t0 = !user;

          if (_context2.t0) {
            _context2.next = 11;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(user.correctPassword(password, user.password));

        case 10:
          _context2.t0 = !_context2.sent;

        case 11:
          if (!_context2.t0) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", next(new AppError('Неправильный логин или пароль', 401)));

        case 13:
          createSendToken(user, 200, req);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.protect = catchAsync(function _callee3(req, res, next) {
  var token, decoded, freshUser;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // eslint-disable-line consistent-return
          token = req.cookies.jwt;
          _context3.next = 3;
          return regeneratorRuntime.awrap(promisify(jwt.verify)(token, process.env.SECRET));

        case 3:
          decoded = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(User.findById(decoded.id));

        case 6:
          freshUser = _context3.sent;

          if (freshUser) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", next(new AppError('Данного пользователя больше не существует'), 401));

        case 9:
          if (!freshUser.changedPasswordAfter(decoded.iat)) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", next(new AppError('Пользователь поменял пароль, пожалуйста войдите на сайт заново'), 401));

        case 11:
          req.user = freshUser;
          console.log(req.user);
          next();

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  });
});