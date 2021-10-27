const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    recieverId:{type:mongoose.Schema.Types.ObjectId,ref:'users'}
});

module.exports = mongoose.model('chats',chatSchema);