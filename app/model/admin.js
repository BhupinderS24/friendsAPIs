const mongoose = require('mongoose');

const users = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    responses: [Number],
    score:Number
})

const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    responses : [Number],
    users:[users]
})

module.exports = mongoose.model('Admin', adminSchema);