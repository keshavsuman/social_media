const mongoose  = require('mongoose');

const connectionSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId},
    
}, { timestamps: true });