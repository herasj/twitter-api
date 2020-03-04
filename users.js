const db = require('./services/mongo');
const client = require('./twitter');
const controller = require('./controllers/find.controller');
const scrap = require('./app');

db.then(
    async () => {
        const users = await controller.find();
        console.log("Usuarios")
        for (const user of users) {
            const follow = scrap('@'+user._id)
            console.dir(follow);
            console.log('');
        }
    }
);