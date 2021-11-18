const mongoose  = require('mongoose');

const messageSchema = mongoose.Schema({
    message:String,
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chat'
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    isDelivered:{
        type:Boolean,
    },
    isRead:{
        type:Boolean,
    }
},{
    timestamp:true
});

module.exports = mongoose.model('Message', messageSchema);