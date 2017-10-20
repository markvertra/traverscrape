const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
mongoose.Promise = require('bluebird');

const GYGProductSchema = new Schema({
  GYGid: {type: String},
  mainPageRank: {type: Number},
  historicRank: {type: Array},
  title: {type: String},
  city: {type: String},
  shortDescription: {type: String},
  link: {type: String},
  reviews: {type: Number},
  price: {type: String},
  operator: {type: String, default: ''},
});

module.exports = mongoose.model('GYGProduct', GYGProductSchema);