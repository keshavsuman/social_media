var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: { type: String },
    university_id: { type: mongoose.Schema.Types.ObjectId, ref: 'university',required:true },
    course_id: [{ type: mongoose.Schema.ObjectId, ref: 'course' }],
    isAutonomous: { type: Boolean, default: false },
    status: { type: Boolean, default: true }
}, { timestamps: true }, { versionKey: false });



module.exports = mongoose.model('college', Schema);