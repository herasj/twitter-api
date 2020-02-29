const db = require('./services/mongo');
const controller = require('./controllers/uribe.controller');
const client = require('./twitter');
var num = 1;
const parameters = {
  track: "#PetroñerosVáyanseAVenezuela",
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
          date: tweet.created_at,
          tweet: tweet.text,
          location: tweet.user.location,
          hashtag: parameters.track
        }
        await controller.create(data);
        console.log('Success! '+num);
        num++;
      })()
      )
      .on("ping", () => console.log("ping"))
      .on("error", error => console.log("error", error))
      .on("end", response => console.log("end"));
  },
  error => console.warn(error)
)
