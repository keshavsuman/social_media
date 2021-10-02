var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: { type: String },
    status: { type: Boolean,default:true}
}, { timestamps: true });



module.exports = mongoose.model('permission', Schema);