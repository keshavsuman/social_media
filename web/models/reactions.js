const mongoose = require('mongoose');

const reactionSchema = mongoose.Schema({
    post_id:{type:mongoose.Schema.Types.ObjectId,ref:'posts'},
    comment_id:{type:mongoose.Schema.Types.ObjectId,ref:'comment'},
    reaction_type:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'users'}

},{timestamps:true});

module.exports = mongoose.model('reactions',reactionSchema);