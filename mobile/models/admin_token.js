var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' },
    token: { type: String },
    req_ip: { type: String },
}, { timestamps: true });



module.exports = mongoose.model('admin_token', Schema);