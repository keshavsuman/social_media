var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    id:{ type: Number, index: true},
    country_id: { type: Number, index: true},
    name: { type: String },
});



module.exports = mongoose.model('states', Schema);