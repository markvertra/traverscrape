const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
mongoose.Promise = require('bluebird');

const OperatorSchema = new Schema({
  name: { type: String }
});

module.exports = mongoose.model('Operator', OperatorSchema);