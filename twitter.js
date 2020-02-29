const Twitter = require('twitter-lite');
require('dotenv').config();

const client = new Twitter({
    subdomain: "api",
    consumer_key: process.env.CONSUMER_TOKEN, 
    consumer_secret: process.env.CONSUMER_SECRET, 
    access_token_key: process.env.API_KEY, 
    access_token_secret: process.env.API_SECRET 
  })
  
  module.exports=client;