var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

var UserSchema = new mongoose.Schema({
    first_name: { type: String, required: [true, "First Name is required!"] },
    last_name: { type: String, required: [true, "Last Name is required!"] },
    email: { type: String, lowercase: true, unique: true, required: [true, "Email is required!"], match: [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/, 'Email is invalid'], index: true },
    provider_type: { type: String },
    provider_id: { type: String },  
    mobile: { type: String },
    dob: { type: String },
    gender: { type: String },
    bio: { type: String },
    profile_pic: { type: String, default: null },
    state: { type: String, default: null },
    home_town: { type: String, default: null },
    country: { type: String, default: null },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'skill' }],
    interests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'interest' }],
    college_year: { type: String, default: null },
    college_batch: { type: String, default: null },
    college: { type: String, default: null },
    course: { type: String, default: null },
    course_start_date: { type: String, default: null },
    course_end_date: { type: String, default: null },
    hash: { type: String},
    salt: { type: String},
    status: { type: Boolean, default: true },
    profile_setup: { type: Boolean, default: false }
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

module.exports = mongoose.model('user', UserSchema);