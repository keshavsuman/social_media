const mongoose = require('mongoose');


const commentsSchema = mongoose.Schema({ 
    post_id:{type:mongoose.Schema.Types.ObjectId,ref:'post'},
    comment_id:{type:mongoose.Schema.Types.ObjectId,ref:'comment'},
    comment:{type:String},
    reply:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment'
    }],
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true}
},{timestamps:true});

module.exports = mongoose.model('comment',commentsSchema);
