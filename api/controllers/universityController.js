const httpStatus = require("http-status-codes");
const University = require('../models/university');
const global = require('../resources/lang/en/global');
const responseManagement = require('../lib/responseManagement');

/**** Create University ****/
module.exports.createUniversity = async (req, res) => {
	try {
		let university = await University.findOne(req.body);
		if (university) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.university_already_exist);
		} else {
			await University.create(req.body);
			responseManagement.sendResponse(res, httpStatus.OK, global.university_created);
		}
	} catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** Delete University ****/
module.exports.deleteUniversity = async (req, res) => {
	try {
		let university = await University.findOne(req.query);
		if (!university) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.university_not_exist);
		} else {
			await University.deleteOne(req.query);
			responseManagement.sendResponse(res, httpStatus.OK, global.university_deleted);
		}
	} catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};

/**** Get Universities ****/
module.exports.getUniversities = async (req, res) => {
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
					[key]: { $regex: searchValue, $options: req.body }
				});
			}
		}
		var sort_q = {
			[sortColumn]: sortOrder
		}
		let query1;
		if (searchValue) {
			query1 = { $or: search_query };
		} else {
			query1 = {};
		}
		const universities = await University.find({ $and: [query1] }, {}, { sort: sort_q, skip: start, limit: length });
		const total = await University.countDocuments({});
		const stotal = await University.countDocuments({ $and: [query1] });


		res.send({ statusCode: httpStatus.OK, universities: universities, draw: draw, recordsTotal: total, recordsFiltered: stotal })
	} catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};

/**** send University according to the id ****/
module.exports.editUniversity = async (req, res) => {
	try {
		let university = await University.findOne(req.query);
		if (!university) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.university_not_exist);
		} else {
			responseManagement.sendResponse(res, httpStatus.OK, '', university);
		}
	} catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** update University ****/
module.exports.updateUniversity = async (req, res) => {
	try {
		let university = await University.findOne({ name: req.body.name });
		if (university) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.university_already_exist);
		} else {
			await University.updateOne({ _id: req.body._id }, req.body);
			responseManagement.sendResponse(res, httpStatus.OK, global.university_updated);
		}
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};

/**** get universities for search ****/
module.exports.searchUniversities = async (req, res) => {
	try {
		let universities = await University.find({ $text: { $search: req.query.name } });
		let universities1 = await University.find({});
		responseManagement.sendResponse(res, httpStatus.OK, '', { universities1 });

	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


module.exports.getUniversitiesList = async (req, res) => {
	try {
		// let universities = await University.find({$text:{$search:req.query.name}});
		let universities = await University.find({ status: true }).sort("name").lean();
		responseManagement.sendResponse(res, httpStatus.OK, '', { universities });

	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** Toggle University Status ****/
module.exports.updateUniversityStatus = async (req, res) => {
	try {
		let university = await University.findOne({ _id: req.query._id });
		if (!university) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.skill_not_exist);
		} else {
			university.status = university.status == true ? false : true;
			university.save();
			responseManagement.sendResponse(res, httpStatus.OK, global.status_updated, { university });
		}
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** get universities for admin ****/
module.exports.getUniversitiesListAdmin = async (req, res) => {
	try {
		let universities = await University.find()
			.collation({ locale: "en" })
			.sort("name").lean();
		responseManagement.sendResponse(res, httpStatus.OK, '', { universities });
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};