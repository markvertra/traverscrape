const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const GYGProductSchema = new Schema({
  rank: number,
  title: string,
  link: string,
  reviews: number,
  price: string,
  operator: string,
});

module.exports = mongoose.model('GYGProduct', GYGProductSchema);