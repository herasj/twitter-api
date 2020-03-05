const db = require('./services/mongo'); //Database connection
const client = require('./twitter'); //API 
const controller = require('./controllers/find.controller'); //Find users
const fs = require('fs');
db.then(
    async () => {
        const users = await controller.find(); //Grab users from db
        for (const user of users) { //For each user
            //Get information
            try {
                const info = await client.get('users/show',{screen_name: user._id});
                const created_at = info.created_at.substring(info.created_at.length-4,info.created_at.length);
                const followers = info.followers_count;
                const following = info.friends_count;
                const tweets = info.statuses_count;
                const verified = info.verified;
                let numbers;

                try {
                    //Count numbers
                    numbers = user._id.match(/\d+/g).map(Number)[0].toString().length;
                } catch (error) {
                    numbers = 0;
                }

                const csvline = `${user._id};${followers};${following};${tweets};${created_at};${verified};${numbers}\n`;
                fs.appendFile('data.csv',csvline,(err) => {
                    if(err) console.error(err);
                }
                )
            } catch (error) {
                console.error(error)
            }

            
        }
    }
);