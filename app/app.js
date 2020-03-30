const express = require('express');
const app = express();
const logger = require('./logger/logger.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://bhupinder:' +process.env.MONGO_ATLAS_PW + '@friends-2d4ln.mongodb.net/test?retryWrites=true&w=majority',
{useNewUrlParser: true});


app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/friendsapp', require('./routes/admin.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log("Server started on port"+PORT);
});