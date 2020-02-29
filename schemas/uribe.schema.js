'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema(
    {
      username: {
        type: String,
        trim: true,
        required: true
      },
      name: {
        type: String,
        trim: true,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      tweet: {
        type: String,
        required: true
      },
      location:{
          type: String,
      },
      hashtag:{
        type: String,
        trim: true,
        required: true
      }
    });
  
  module.exports = schema