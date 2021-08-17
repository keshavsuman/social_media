const httpStatus = require("http-status-codes");
const College = require('../models/college');
const global = require('../resources/lang/en/global');
const responseManagement = require('../lib/responseManagement');
const config = require('../config/config');
const helper = require('../helper/helper');


/**** Create College ****/
module.exports.createCollege = async (req, res) => {
    try {
        let college = await College.findOne({ name: req.body.name });
        if (college) {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.college_already_exist);
        } else {
            if (req.body.university_id) {
                await College.create(req.body);
            }
            else {
                delete req.body.university_id;
                await College.create(req.body);
            }
            responseManagement.sendResponse(res, httpStatus.OK, global.college_created);
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/**** Delete College ****/
module.exports.deleteCollege = async (req, res) => {
    try {
        let college = await College.findOne(req.query);
        if (!college) {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.college_not_exist);
        } else {
            await College.deleteOne(req.query);
            responseManagement.sendResponse(res, httpStatus.OK, global.college_deleted);
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

/**** Create College ****/
module.exports.getColleges = async (req, res) => {
    try {
        const { start, length, columns, order, search, draw } = req.body.data;
        const sortColumn = columns[order[0].column].data;
        const sortOrder = order[0].dir;
        const searchValue = search.value;
        var search_query = [];
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].searchable) {
                var key = columns[i]['name']
                search_query.push({
                    [key]: { $regex: searchValue, $options: 'i' }
                });
            }
        }
        var sort_q = {
            [sortColumn]: sortOrder
        }
        var query1;
        if (searchValue) {
            query1 = { $or: search_query };
        } else {
            query1 = {};
        }
        const colleges = await College.find({ $and: [query1] }, {}, { sort: sort_q, skip: start, limit: length });
        const total = await College.countDocuments({});
        const stotal = await College.countDocuments({ $and: [query1] });
        res.send({ status: httpStatus.OK, colleges: colleges, draw: draw, recordsTotal: total, recordsFiltered: stotal })
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

/**** send college according to the id ****/
module.exports.editCollege = async (req, res) => {
    try {
        let college = await College.findOne(req.query).populate({ path: 'course_id', model: 'course' });
        if (!college) {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.college_not_exist);
        } else {
            responseManagement.sendResponse(res, httpStatus.OK, '', college);
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/**** update college ****/
module.exports.updateCollege = async (req, res) => {
    try {
        let college = await College.findOne({ $and: [{ name: req.body.name }, { _id: { $ne: req.body._id } }] });
        if (college) {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.college_already_exist);
        } else {
            await College.updateOne({ _id: req.body._id }, req.body);
            responseManagement.sendResponse(res, httpStatus.OK, global.college_updated);
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/**** Get College list ****/
module.exports.getCollegesList = async (req, res) => {
    try {
        let college = await College.find({status:true})
                                    .collation({locale: "en" })
                                    .sort("name").lean();
        responseManagement.sendResponse(res, httpStatus.OK, '', { college });
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/**** Toggle College Status ****/
module.exports.updateCollegeStatus = async (req, res) => {
    try {
        let college = await College.findOne({ _id: req.query._id });
        if (!college) {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.college_not_exist);
        } else {
            college.status = college.status == true ? false : true;
            college.save();
            responseManagement.sendResponse(res, httpStatus.OK,global.status_updated);
        }
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};