const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    message:{
        type:String
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    isDeleted:{
        type:Boolean,
    }
},{
    timestamp:true
});

const chatSchema = mongoose.Schema({
    users:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'user'
    },
    messages:[{
        type: messageSchema
    }]
    
});

export default mongoose.model('chat',chatSchema);