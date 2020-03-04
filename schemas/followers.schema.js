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
      description: {
        type: String
      },
      date: {
        type: Date
      },
      location:{
          type: String,
      },
    });
  
  module.exports = schema