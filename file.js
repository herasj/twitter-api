const fs = require('fs');
const controller = require('./controllers/find.controller');
(async ()=>{
    fs.readFile('data.csv', 'utf8', function(err, contents) {
        const data = contents.split(';');
        const envio = {
            username: data[0],
            followers: data[1],
            following: data[2],
            tweets: data[3],
            created_at: data[4],
            verified: data[5],
            numbers: data[6],
            bot: 0 //0: Unchecked, 1: Negative, 2: Positve
        }
        controller.create()
        console.dir(data);
    });
     
})()