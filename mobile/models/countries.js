var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    phone_code:{type:String},
    name: { type: String },
    capital:{type:String},
    currency:{type:String},
    region:{type:String},
    subRegion:{type:String},
    emoji:{type:String}
});



module.exports = mongoose.model('countries', Schema);