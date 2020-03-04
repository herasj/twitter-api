const db = require('./services/mongo');
const controller = require('./controllers/uribe.controller');
const client = require('./twitter');
const parameters = {
  track: "#RespeteALosNiñosSamper",
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
        const followers = await client.get('followers/list',{screen_name: tweet.user.screen_name});
        var array = [];
        console.table(followers);
        for (const iterator in followers) {
          if (iterator.screen_name != undefined){
          array.push({
            username: iterator.screen_name,
            description: iterator.description,
            date: iterator.created_at,
            location: iterator.location
          })
        }
        }
        console.log("Terminó el array");
        console.dir(array)
        await controller.create(data);
      })()
      )
      .on("ping", () => console.log("ping"))
      .on("error", error => console.log("error", error))
      .on("end", response => console.log("end"));
  },
  error => console.warn(error)
)
