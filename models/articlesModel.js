const mongoose = require('mongoose');
// const validator = require('validator');

const articlesSchema = new mongoose.Schema({
  name: {
    type: String,
    dropDups: true,
    required: true,
    minlength: 6,
    maxlength: 25,
    unique: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    minlength: 6,
  },
  category: {
    type: String,
  },
  views: {
    type: Number,
  },
  article: Object,
});
const Article = mongoose.model('Article', articlesSchema);
module.exports = Article;
