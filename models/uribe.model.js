'use strict'
const mongoose = require('mongoose');
const schema = require('../schemas/users.schema');

module.exports = mongoose.model('uribistas', schema);