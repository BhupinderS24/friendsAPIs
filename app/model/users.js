const mongoose = require('mongoose');
const users = mongoose.schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    responses: [String],
    admin_id: Number
    
})