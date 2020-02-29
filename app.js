const Twitter = require('twitter-lite');
require('dotenv').config();
const fs = require('fs');
const db = require('./services/mongo');
const controller = require('./controllers/uribe.controller');

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

db.then(
  () => {
    console.log('Running Mongo Database')
    
    const stream = client.stream("statuses/filter", parameters)
      .on("start", response => console.log("start"))
      .on("data", tweet => (async () => {
        const data ={
          username: tweet.user.screen_name,
          name: tweet.user.name,
          lastTweetDate: tweet.created_at,
          tweet: tweet.text,
          location: tweet.user.location,
          hashtag: parameters.track
        }
        await controller.create(data);
      })()
      )
      .on("ping", () => console.log("ping"))
      .on("error", error => console.log("error", error))
      .on("end", response => console.log("end"));
  },
  error => console.warn(error)
)
