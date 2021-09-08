const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    post_id:{type:mongoose.Schema.Types.ObjectId,ref:'posts',required:true},
    comment:{type:String},
    reply:[{
        type:String,
        user:mongoose.Schema.Types.ObjectId,ref:'users'
    }],
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true}

},{timestamps:true});

module.exports = mongoose.model('comments',commentsSchema);