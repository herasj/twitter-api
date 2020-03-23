'use strict'
const model = require('../models/trending_user.model')
module.exports = {
    create: async (data) => {
        await model.create(data, function (err) {
            if (err) throw err
            
          });
        
        return 0
    }
    
}