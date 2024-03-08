const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI).then(
        (data) => console.log(`database connected on ${data.connection.host}`)
    ).catch(
        (error)=>{console.log(error)
    })