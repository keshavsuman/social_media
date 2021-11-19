var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    country_id: { type: mongoose.Schema.Types.ObjectId, index: true},
    name: { type: String },
});



module.exports = mongoose.model('state', Schema);