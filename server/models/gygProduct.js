const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
mongoose.Promise = require('bluebird');

const GYGProductSchema = new Schema({
  mainPageRank: {type: Number},
  title: {type: String},
  city: {type: String},
  shortDescription: {type: String},
  link: {type: String},
  reviews: {type: Number},
  price: {type: String},
  operator: {type: String},
});

module.exports = mongoose.model('GYGProduct', GYGProductSchema);