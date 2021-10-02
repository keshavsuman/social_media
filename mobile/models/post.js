var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    content: { type: String },
    media_type: { type: String },
    visibility: { type: String },
    media_url: [{ type: String }],
    admin_approved: {type: Boolean, default:false},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:'comments'}],
    LIKE:{type:Number,default:0},
    DISLIKE:{type:Number,default:0},
    SAD:{type:Number,default:0},
    ANGRY:{type:Number,default:0}
}, { timestamps: true });


module.exports = mongoose.model('post', Schema);