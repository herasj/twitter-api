const db = require('./services/mongo'); //Database connection
const client = require('./twitter'); //API 
const controller = require('./controllers/find.controller'); //Find users

db.then(
    async () => {
        const users = await controller.find(); //Grab users from db
        for (const user of users) { //For each user
            //Get information
            const info = await client.get('users/show',{screen_name: user._id});
            const created_at = info.created_at;
            const followers = info.followers_count;
            const following = info.friends_count;
            const tweets = info.statuses_count;
            const verified = info.verified;
            let numbers;
            console.log(user._id);
            try {
                //Count numbers
                 numbers = user._id.match(/\d+/g).map(Number)[0].toString().length;
            } catch (error) {
                numbers = 0;
            }
            const envio = {
                username: user._id,
                followers: followers,
                following: following,
                tweets: tweets,
                created_at: created_at,
                verified: verified,
                numbers: numbers,

            }
            console.table(envio);
        }
    }
);