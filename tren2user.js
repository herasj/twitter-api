const db = require('./services/mongo');
const controller = require('./controllers/find.controller');
const client = require('./twitter');

const parameters = {
    track: "#FelizJueves",
  };
  db.then(() => {
    console.log('Running Mongo Database');
    const stream = client.stream("statuses/filter", parameters)
      .on("start", response => console.log("start"))
      .on("data", tweet => (async () => {
        const year =tweet.user.created_at;
        let numbers;
        try {
            //Count numbers
            numbers = tweet.user.screen_name.match(/\d+/g).map(Number)[0].toString().length;
        } catch (error) {
            numbers = 0;
        }

        const data ={
          username: tweet.user.screen_name,
          followers: tweet.user.followers_count,
          created_at: year.substring(year.length-4,year.length),
          following: tweet.user.friends_count,
          tweets: tweet.user.statuses_count,
          verified: tweet.user.verified,
          usernumbers: numbers,
          bot: 0
        }
        controller.create(data);
    })()
    )
    .on("ping", () => console.log("ping"))
    .on("error", error => console.log("error", error))
    .on("end", response => console.log("end"));
  },
  error => console.warn(error)
  )