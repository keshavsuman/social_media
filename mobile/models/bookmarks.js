const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema({
    post_id:[{type:mongoose.Schema.Types.ObjectId,ref:'post',required:true}],
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true}
},{timestamps:true});

module.exports = mongoose.model('bookmark',bookmarkSchema);
