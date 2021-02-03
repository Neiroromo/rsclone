const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 15,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Пожалуйста введите пароль'],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Вы забыли ввести пароль подтверждения'],
    validate: {
      validator(val) {
        return val === this.password;
      },
      message: 'Пароль подверждения не совпадает',
    },
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Пожалуйста введите почту!'],
    minlength: 1,
    maxlength: 50,
    unique: true,
    // validate: [validator.isEmail, 'Введена не валидная почта'],
  },
  photo: {
    type: String,
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  const result = await bcryptjs.compare(candidatePassword, userPassword);
  return result;
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
