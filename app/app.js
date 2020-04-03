const express = require('express');
const app = express();
const logger = require('./logger/logger.js');
const mongoose = require('mongoose');


var dev_db_url= 'mongodb+srv://bhupinder:bhupinder@friends-2d4ln.mongodb.net/test?retryWrites=true&w=majority';
var mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, {useNewUrlParser: true});


app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    res.header('Access-control-Allow-Origin','*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})
app.use('/friendsapp', require('./routes/admin.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log("Server started on port"+PORT);
});