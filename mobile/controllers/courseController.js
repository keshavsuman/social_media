const httpStatus = require("http-status-codes");
const Course = require('../models/course');
const global = require('../resources/lang/en/global');
const responseManagement = require('../lib/responseManagement');
const College = require('../models/college');

/**** Create Course ****/
module.exports.createCourse = async (req, res) => {
	try {
		let course = await Course.findOne(req.body);
		if (course) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.course_already_exist);
		} else {
			await Course.create(req.body);
			responseManagement.sendResponse(res, httpStatus.OK, global.course_created);
		}
	} catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** Delete Course ****/
module.exports.deleteCourse = async (req, res) => {
	try {
		let course = await Course.findOne(req.query);
		if (!course) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.course_not_exist);
		} else {
			await Course.deleteOne(req.query);
			responseManagement.sendResponse(res, httpStatus.OK, global.course_deleted);
		}
	} catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};

/**** Create Course ****/
module.exports.getCourses = async (req, res) => {
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
		const courses = await Course.find({ $and: [query1] }, {}, { sort: sort_q, skip: start, limit: length });
		const total = await Course.countDocuments({});
		const stotal = await Course.countDocuments({ $and: [query1] });
		res.send({ status: httpStatus.OK, courses: courses, draw: draw, recordsTotal: total, recordsFiltered: stotal })
	} catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};

/**** send course according to the id ****/
module.exports.editCourse = async (req, res) => {
	try {
		let course = await Course.findOne(req.query);
		if (!course) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.course_not_exist);
		} else {
			responseManagement.sendResponse(res, httpStatus.OK, '', course);
		}
	} catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** update course ****/
module.exports.updateCourse = async (req, res) => {
	try {
		let course = await Course.findOne({ name: req.body.name });
		if (course) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.course_already_exist);
		} else {
			await Course.updateOne({ _id: req.body._id }, req.body);
			responseManagement.sendResponse(res, httpStatus.OK, global.course_updated);
		}
	} catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** get courses for search ****/
module.exports.searchCourses = async (req, res) => {
	try {
		let courses = await Course.find({ name: { $regex: req.params.course, $options: 'i' } });
		responseManagement.sendResponse(res, httpStatus.OK, '',courses);
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};

/**** Get Courses list ****/
module.exports.getCoursesList = async (req, res) => {
	try {
		let courses = await College.find({
			_id:req.params.collegeId,
		},{course_id:1,_id:0}).populate({path:'course_id',select:{status:0,__v:0}});
		responseManagement.sendResponse(res, httpStatus.OK, 'Courses list', courses[0].course_id);
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** Toggle Course Status ****/
module.exports.updateCourseStatus = async (req, res) => {
	try {
		let course = await Course.findOne({ _id: req.query._id });
		if (!course) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.course_not_exist);
		} else {
			course.status = course.status == true ? false : true;
			course.save();
			responseManagement.sendResponse(res, httpStatus.OK, global.status_updated, { course });
		}
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** Get Courses list ****/
module.exports.getCoursesListAdmin = async (req, res) => {
	try {
		let courses = await Course.find()
								.collation({locale: "en" })
								.sort("name").lean();
		responseManagement.sendResponse(res, httpStatus.OK, '', { courses });
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};