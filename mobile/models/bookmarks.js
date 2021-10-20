const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema({
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:'posts',required:true}],
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true}
},{timestamps:true});

module.exports = mongoose.model('bookmarks',bookmarkSchema);
