var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

var UserSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required!"] },
    email: { type: String, lowercase: true, unique: true, required: [true, "Email is required!"], match: [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/, 'Email is invalid'], index: true },
    mobile: { type: String },
    dob: { type: String },
    hash: { type: String },
    salt:{type:String},
    status: { type: Boolean, default: true },
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'role' },
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function () {
    return jwt.sign({ _id: this._id }, config.secretKey);
};

module.exports = mongoose.model('admin', UserSchema);