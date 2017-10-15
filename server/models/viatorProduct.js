const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ViatorProductSchema = new Schema({
  rank: {type: Number},
  title: {type: String},
  link: {type: String},
  reviews: {type: Number},
  price: {type: String},
  operator: {type: String},
});

module.exports = mongoose.model('ViatorProduct', ViatorProductSchema);