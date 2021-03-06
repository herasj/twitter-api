'use strict'
const model = require('../models/find.model');
const infoModel = require('../models/uribe.model');

const agg = [
  {
    '$group': {
      '_id': '$username'
    }
  }
];

module.exports = {
    find: async () => {
      const users = await infoModel.aggregate(agg);
      return users;
    },
    create: async(data) => {
      const result = await model.findOne({username: data.username});
      if (!result){
        await model.create(data,(err) => {
          if (err) throw err
        }
        )
      }
      else{
        // console.log(`${data.username} existe :(`);
      }
      
    }
    
    
}