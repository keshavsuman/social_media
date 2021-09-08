const mongoose = require('mongoose');

const reactionSchema = mongoose.Schema({
    post_id:{type:mongoose.Schema.Types.ObjectId,ref:'posts'},
    reaction_type:{type:String},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'users'}

},{timestamps:true});

module.exports = mongoose.model('reactions',reactionSchema);