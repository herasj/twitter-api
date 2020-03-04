const db = require('./services/mongo');
const controller = require('./controllers/uribe.controller');
const client = require('./twitter');
// const fs = require('fs');

const parameters = {
  track: "#LaJepDebeSerEliminada",
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

      //   const followers = await client.get('followers/list',{screen_name: tweet.user.screen_name, count:1});
      //   var array = [];
      //   // const jsonfile = JSON.parse(followers);
      //    const jsoncontent = JSON.stringify(followers);
      //    fs.writeFile("output.json", jsoncontent, 'utf8', function (err) {
      //     if (err) {
      //         console.log("An error occured while writing JSON Object to File.");
      //         return console.log(err);
      //     }
       
      //     console.log("JSON file has been saved.");
      // });
        // for (const iterator in followers) {
        //   if (iterator.screen_name != undefined){
        //   array.push({
        //     username: iterator.screen_name,
        //     description: iterator.description,
        //     date: iterator.created_at,
        //     location: iterator.location
        //   })
        // }
        // }
        // console.log("Terminó el array");
        // console.dir(array)
        
        await controller.create(data);
      })()
      )
      .on("ping", () => console.log("ping"))
      .on("error", error => console.log("error", error))
      .on("end", response => console.log("end"));
  },
  error => console.warn(error)
)
