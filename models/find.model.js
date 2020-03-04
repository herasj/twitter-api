'use strict'
const mongoose = require('mongoose');
const schema = require('../schemas/find.schema');

module.exports = mongoose.model('users', schema);