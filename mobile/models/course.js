var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: { type: String, index: true, text: true },
    duration: { type: Number },
    status: { type: Boolean,default:true }
}, { timestamps: true });



module.exports = mongoose.model('course', Schema);