var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    content: { type: String },
    media_type: { type: String },
    visibility: { type: String },
    media_url: { type: String },
    admin_approved: {type: Boolean, default:false},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:'comments'}],
}, { timestamps: true });


module.exports = mongoose.model('post', Schema);