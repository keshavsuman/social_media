const mongoose = require('mongoose');

const replySchema = mongoose.Schema({
        reply:{type:String},
        user:{  
                type:mongoose.Schema.Types.ObjectId,
                ref:'user',
            },
        time:{type:Date,default:Date.now()},
        like_count:{type:Number,default:0},
        
});

const commentsSchema = mongoose.Schema({
    post_id:{type:mongoose.Schema.Types.ObjectId,ref:'post',required:true},
    comment:{type:String},
    reply:[replySchema],
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true}
},{timestamps:true});

module.exports = mongoose.model('comments',commentsSchema);
// module.exports = replySchema;