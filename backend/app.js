const express = require('express');
var cookieParser = require('cookie-parser')
const app = express ();
const cors = require('cors');
const path = require('path');

const dotenv = require('dotenv');

// configuring dotenv
dotenv.config({path:'backend/config/config.env'});

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.use(cookieParser());

// importing Routes
const blogPosts = require('./routes/blogPostsRoute');
const user = require('./routes/userRoute');
app.use('/api/v1',blogPosts);
app.use('/api/v1',user);

app.use(express.static(path.join(__dirname , '../frontend/build')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname , '../frontend/build/index.html'));
})

module.exports = app;