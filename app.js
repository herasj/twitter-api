const Twitter = require('twitter-lite');
require('dotenv').config()

const client = new Twitter({
  subdomain: "api",
  consumer_key: process.env.CONSUMER_TOKEN, 
  consumer_secret: process.env.CONSUMER_SECRET, 
  access_token_key: process.env.API_KEY, 
  access_token_secret: process.env.API_SECRET 
})

const parameters = {
  track: "#DeDuqueDesapruebo",
};

const stream = client.stream("statuses/filter", parameters)
  .on("start", response => console.log("start"))
  .on("data", tweet => console.log("data", tweet.text))
  .on("ping", () => console.log("ping"))
  .on("error", error => console.log("error", error))
  .on("end", response => console.log("end"));