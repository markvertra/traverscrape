const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ProductSchema = new Schema({
  title: string,
  operator: string,
  gygProductID: string,
  viatorProductId: string,
});

module.exports = mongoose.model('Product', ProductSchema);