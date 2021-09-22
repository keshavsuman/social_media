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
        let college = await College.findById(req.body.id);
        if (!college) {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.college_not_exist);
        } else {
            await College.findByIdAndDelete(req.body.id);
            responseManagement.sendResponse(res, httpStatus.OK, global.college_deleted);
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

module.exports.getColleges = async (req, res) => {
    try {
        // const { start, length, columns, order, search, draw } = req.body.data;
        // const sortColumn = columns[order[0].column].data;
        // const sortOrder = order[0].dir;
        // const searchValue = search.value;
        // var search_query = [];
        // for (var i = 0; i < columns.length; i++) {
        //     if (columns[i].searchable) {
        //         var key = columns[i]['name']
        //         search_query.push({
        //             [key]: { $regex: searchValue, $options: 'i' }
        //         });
        //     }
        // }
        // var sort_q = {
        //     [sortColumn]: sortOrder
        // }
        // var query1;
        // if (searchValue) {
        //     query1 = { $or: search_query };
        // } else {
        //     query1 = {};
        // }
        const colleges = await College.find({}).sort({_id:-1}).skip(req.body.after).limit(req.body.limit);
        const total = await College.countDocuments({});
        // const stotal = await College.countDocuments({ $and: [query1] });

        res.send({ status: httpStatus.OK, colleges: colleges, recordsTotal: total})
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

/**** send college according to the id ****/
module.exports.editCollege = async (req, res) => {
    try {
        let college = await College.findById(req.body.id);
        if (!college) {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.college_not_exist);
        } else {
            var newcollege = await College.findByIdAndUpdate(req.body.id,{
                name:req.body.name??college.name,
                university_id:req.body.university_id??college.university_id,
                isAutonomous:req.body.isAutonomous??college.isAutonomous,
                status:req.body.status??college.status
            },{new:true});
            responseManagement.sendResponse(res, httpStatus.OK, '', newcollege);
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

module.exports.searchCollege = async (req,res)=>{
    try {
		var colleges  = await College.find({'name': {'$regex': req.params.college, '$options': 'i'}});
		responseManagement.sendResponse(res,httpStatus.OK,"",colleges);
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
}