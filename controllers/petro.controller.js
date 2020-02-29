'use strict'
const model = require('../models/petro.model')
module.exports = {
    create: async (data) => {
        await model.create(data, function (err) {
            if (err) throw err
            console.log('Success! P')
          });
        return 0
    }
    
}