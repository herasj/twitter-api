'use strict'
const mongoose = require('mongoose');
const schema = require('../schemas/trending_user.schema');

module.exports = mongoose.model('trending', schema);