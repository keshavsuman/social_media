const mongoose =  require('mongoose');

const notificationSchema = mongoose.Schema({
    title:{type:String},
    type:{type:String},
    description:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true}
},{timestamps:true});

module.exports = mongoose.model('notification',notificationSchema);