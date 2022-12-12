const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Contacts', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    err => {
        if (!err) {
            console.log('Connected to DB')
        } else {
            console.log('Error in connection' + err)
        }
    });

require('./contact')