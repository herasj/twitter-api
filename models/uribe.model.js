'use strict'
const mongoose = require('mongoose');
const schema = require('../schemas/uribe.schema');

module.exports = mongoose.model('uribistas', schema);