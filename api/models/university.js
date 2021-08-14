var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: { type: String,index:true , text:true},
    status:{ type: Boolean, default:true }
}, { timestamps: true });

Schema.index({ title: 'text', description: 'text', tags: 'text' })


module.exports = mongoose.model('university', Schema);
