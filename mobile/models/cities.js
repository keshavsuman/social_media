var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    state_id: { type: mongoose.Schema.Types.ObjectId, index: true},
    name: { type: String },
});



module.exports = mongoose.model('cities', Schema);