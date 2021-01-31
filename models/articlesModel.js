const mongoose = require('mongoose');
// const validator = require('validator');

const articlesSchema = new mongoose.Schema({
  articleID: {
    type: Number,
    required: true,
    trim: true,
  },
  authorID: {
    type: String,
    required: true,
    trim: true,
  },
  userChangedID: {
    type: Number,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  data: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  changes: {
    type: Number,
    required: true,
    trim: true,
  },
  article: Object,
});
const Article = mongoose.model('Article', articlesSchema);
module.exports = Article;
