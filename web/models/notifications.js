const mongoose =  require('mongoose');

const notificationSchema = mongoose.Schema({
    title:{type:String},
    type:{type:String},
    description:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    post:{type:mongoose.Schema.Types.ObjectId,ref:'post'},
    notificationFrom:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
},{timestamps:true});

module.exports = mongoose.model('notification',notificationSchema);