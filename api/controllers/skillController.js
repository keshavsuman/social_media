const httpStatus = require("http-status-codes");
const Skill = require('../models/skill');
const global = require('../resources/lang/en/global');
const responseManagement = require('../lib/responseManagement');

/**** Create Skill ****/
module.exports.createSkill = async (req, res) => {
	try {
		let skill = await Skill.findOne(req.body);
		if (skill) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.skill_already_exist);
		} else {
			await Skill.create(req.body);
			responseManagement.sendResponse(res, httpStatus.OK, global.skill_created);
		}
	} catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** Delete Skill ****/
module.exports.deleteSkill = async (req, res) => {
	try {
		let skill = await Skill.findOne(req.query);
		if (!skill) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.skill_not_exist);
		} else {
			await Skill.deleteOne(req.query);
			responseManagement.sendResponse(res, httpStatus.OK, global.skill_deleted);

		}
	} catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};

/**** Get Skill ****/
module.exports.getSkills = async (req, res) => {
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
					[key]: { $regex: searchValue, $options: {locale: "en" }
				}
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
		const skills = await Skill.find({ $and: [query1] }, {}, { sort: sort_q, skip: start, limit: length });
		const total = await Skill.countDocuments({});
		const stotal = await Skill.countDocuments({ $and: [query1] });
		res.send({ status: httpStatus.OK, skills: skills, draw: draw, recordsTotal: total, recordsFiltered: stotal })
	} catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};

module.exports.searchSkills = async (req,res)=>{
	try {
		var skills  = await Skill.find({'name': {'$regex': req.params.skill, '$options': 'i'}});
		console.log(skills)
		responseManagement.sendResponse(res,httpStatus.OK,"",skills);
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
}

/**** send Skill according to the id ****/
module.exports.editSkill = async (req, res) => {
	try {
		let skill = await Skill.findById(req.body._id);
		if (!skill) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.skill_not_exist);
		} else {
			await Skill.findByIdAndUpdate(req.body._id,{
				name:req.body.name
			})
			responseManagement.sendResponse(res, httpStatus.OK, '', skill);
		}
	} catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** update Skill ****/
module.exports.updateSkill = async (req, res) => {
	try {
		let skill = await Skill.findOne({ name: req.body.name });
		if (skill) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.interest_already_exist);
		} else {

			await Skill.updateOne({ _id: req.body._id }, req.body);
			responseManagement.sendResponse(res, httpStatus.OK, global.skill_updated);
		}
	} catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};

/**** Get skills list ****/
module.exports.getSkillsList = async (req, res) => {
	try {
		let skills = await Skill.find({ status: true })
								.collation({locale: "en" })
								.sort("name");
		responseManagement.sendResponse(res, httpStatus.OK, '', { skills });
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** Toggle Skill Status ****/
module.exports.updateSkillStatus = async (req, res) => {
	try {
		let skill = await Skill.findOne({ _id: req.query._id });
		if (!skill) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.skill_not_exist);
		} else {
			skill.status = skill.status == true ? false : true;
			skill.save();
			responseManagement.sendResponse(res, httpStatus.OK, global.status_updated, { skill });
		}
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};