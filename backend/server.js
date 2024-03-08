const app = require('./app');
const dotenv = require('dotenv');

// configuring dotenv
dotenv.config({path:'backend/config/config.env'});

// connecting Database
require('./config/databaseConnection');

const PORT = process.env.PORT;    

app.listen(PORT,()=>{
    console.log(`Connected on port: ${PORT}`);
})