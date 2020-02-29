'use strict'
const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/twitter-info';
const options = { 
  useNewUrlParser: true ,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}

module.exports =  mongoose.connect(url, options)