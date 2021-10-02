var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    token: { type: String },
    req_ip: { type: String },
    user_agent: { type: String }
}, { timestamps: true });



module.exports = mongoose.model('user_token', Schema);