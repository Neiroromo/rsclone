const { findById } = require('../models/usersModel');
const User = require('../models/usersModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});
exports.updateMe = catchAsync(async (req, res) => {
  const filteredBody = filterObj(req.body, 'name', 'email');
  await User.findByIdAndUpdate(req.user._id, filteredBody, {
    runValidators: true,
  });
  const newUser = await User.findById(req.user._id);
  res.status(200).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.getNameById = catchAsync(async (req, res, next) => {
  let name;
  if (req.params.id) {
    name = await User.findById(req.params.id).select('name');
  }
  if (!name) {
    return next(new AppError('Пользавателя с данным айди не сущестует', 404));
  }
  res.status(200).json({
    status: 'success',
    name,
  });
});
exports.deleteMe = catchAsync(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.user._id);
  res.status(200).json({
    user: deletedUser.name,
    status: 'success',
    mesage: 'Пользователь успешно удален',
  });
});
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
