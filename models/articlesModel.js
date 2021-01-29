const mongoose = require('mongoose');
// const validator = require('validator');

const articlesSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    trim: true,
  },
  data: {
    type: Object,
    // required: true,
    unique: true,
  },
  article: Object,
});
const Article = mongoose.model('Article', articlesSchema);
module.exports = Article;
