const mongoose  = require('mongoose');

const connectionSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    requested:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    followings:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    connections:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}]
});

module.exports = mongoose.model('connections',connectionSchema);

/*
connection type can be  :- Pending,Partial,Requested,Connected  
*/