const mongoose = require('mongoose');

const replySchema = mongoose.Schema({
        reply:{type:String},
        user:{  
                type:mongoose.Schema.Types.ObjectId,
                ref:'users',
            },
        time:{type:Date,default:Date.now()}
});

const commentsSchema = mongoose.Schema({
    post_id:{type:mongoose.Schema.Types.ObjectId,ref:'posts',required:true},
    comment:{type:String},
    reply:[replySchema],
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true}
},{timestamps:true});

module.exports = mongoose.model('comments',commentsSchema);
// module.exports = replySchema;