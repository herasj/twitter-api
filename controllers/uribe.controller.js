'use strict'
const model = require('../models/uribe.model')
module.exports = {
    create: async (data) => {
        await model.create(data, function (err) {
            if (err) throw err
            console.log('Success!')
          });
        return 0
    }
    
}