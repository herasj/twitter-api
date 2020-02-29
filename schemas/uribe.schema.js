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
        type: Date,
        trim: true,
        required: true
      },
      lastTweetDate: {
        type: Date,
        required: true
      },
      tweet: {
        type: String,
        required: true
      },
      location:{
          type: String,
          required: true
      },
      hashtag:{
        type: String,
        trim: true,
        required: true
      }
    },
    {
      timestamps: true,
      versionKey: false
    });
  
  module.exports = schema