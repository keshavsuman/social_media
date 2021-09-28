const httpStatus = require("http-status-codes");
const Interest = require('../models/interest');
const global = require('../resources/lang/en/global');
const responseManagement = require('../lib/responseManagement');


/**** Create Interest ****/
module.exports.createInterest = async(req,res)=>{
	try{
		let interest = await Interest.findOne(req.body);
		if(interest){
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.interest_already_exist);	
		} else {
			await Interest.create(req.body);
	        responseManagement.sendResponse(res, httpStatus.OK, global.interest_created);

		}
	}catch(error){
		console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** Delete Interest ****/
module.exports.deleteInterest = async(req,res)=>{
	try{
		let interest = await Interest.findOne(req.query);
		if(!interest){
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.interest_not_exist);	
		} else {
			await Interest.deleteOne(req.query);
	        responseManagement.sendResponse(res, httpStatus.OK, global.interest_deleted);

		}
	}catch(error){
		console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};

/**** Create Interest ****/
module.exports.getInterests = async(req,res)=>{
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
        var query1;
        if (searchValue) {
            query1 = { $or: search_query };
        } else {
            query1 = {};
        }
        const interests = await Interest.find({ $and: [query1] }, {}, { sort: sort_q, skip: start, limit: length });
        const total = await Interest.countDocuments({});
        const stotal = await Interest.countDocuments({ });
        res.send({ status: httpStatus.OK, interests: interests, draw: draw, recordsTotal: total, recordsFiltered: stotal })
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

/**** send interest according to the id ****/
module.exports.editInterest = async(req,res)=>{
	try{
		let interest = await Interest.findById(req.body._id);
		if(!interest){
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.interest_not_exist);	
		} else {
			await Interest.findByIdAndUpdate(req.body._id,{
				name:req.body.name??interest.name,
				photo:req.body.photo??interest.photo,
				status:req.body.status??interest.status
			});
	        responseManagement.sendResponse(res, httpStatus.OK, 'interest updated successfully',[]);
		}
	}catch(error){
		console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** update interest ****/
module.exports.updateInterest = async(req,res)=>{
	try{
		let interest = await Interest.findOne({name:req.body.name});
		if(interest){
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.interest_already_exist);	
		} else {
			await Interest.updateOne({_id:req.body._id},req.body);
	        responseManagement.sendResponse(res, httpStatus.OK, global.interest_updated);
		}
	}catch(error){
		console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** Get interest list ****/
module.exports.getInterestsList = async (req, res) => {
	try {
		let interests = await Interest.find({status:true})
										.sort("name");
		responseManagement.sendResponse(res, httpStatus.OK, '', { interests });
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** Toggle Interest Status ****/
module.exports.updateInterestStatus = async (req, res) => {
	try {
		let interest = await Interest.findOne({ _id: req.query._id });
		if (!interest) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.interest_not_exist);
		} else {
			interest.status = interest.status == true ? false : true;
			interest.save();
			responseManagement.sendResponse(res, httpStatus.OK, global.status_updated, { interest });
		}
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};

module.exports.searchInterests = async (req,res)=>{
    try {
		var interests  = await Interest.find({'name': {'$regex': req.params.interest, '$options': 'i'}});
		responseManagement.sendResponse(res,httpStatus.OK,"",interests);
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
}