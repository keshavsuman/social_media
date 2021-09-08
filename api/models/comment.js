const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    post_id:{type:mongoose.Schema.Types.ObjectId,ref:'posts'},
    comment:{type:String},
    reply:[{}],
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'users'}

},{timestamps:true});

module.exports = mongoose.model('comments',commentsSchema);