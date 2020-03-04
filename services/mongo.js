'use strict'
const mongoose = require('mongoose')
require('dotenv').config();

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@dbs-n72ly.mongodb.net/twitter-info?retryWrites=true&w=majority`;

const options = { 
  useNewUrlParser: true ,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}

module.exports =  mongoose.connect(url, options)