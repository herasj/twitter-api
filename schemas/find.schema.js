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
      followers: {
        type: Number
      },
      following: {
        type: Number
      },
      tweets: {
        type: Number
      },
      created_at: {
        type: String
      },
      usernumbers:{
          type: Number,
      },
      bot:{
        type: Number
      }
    });
  
  module.exports = schema