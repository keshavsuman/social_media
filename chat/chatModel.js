const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    recieverId:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
});

module.exports = chatSchema;