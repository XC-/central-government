/**
 * Created by xc- on 16.10.2016.
 */
const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
  name: {
    type: String, required: true, unique: true
  },
  prefix: {
    type: String, required: true, unique: true
  },
  port: {
    type: Number, required: true, unique: true
  },
  protected: {
    type: Boolean, default: false
  }
});

module.exports = mongoose.model('Service', serviceSchema);
