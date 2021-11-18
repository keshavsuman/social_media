const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    users:[{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    lastMessage:{type:String, default:''},
    lastActive:{
        type:Date,
    },
},{
    timestamps:true
});

module.exports = mongoose.model('chat',chatSchema);