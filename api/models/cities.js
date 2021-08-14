var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    id:{ type: Number, index: true},
    state_id: { type: Number, index: true},
    name: { type: String },
});



module.exports = mongoose.model('cities', Schema);