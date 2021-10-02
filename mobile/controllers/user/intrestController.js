const responseManagement = require('../../lib/responseManagement');
const httpStatus = require("http-status-codes");
const INTEREST = require('../../models/interest');
const USER = require('../../models/user');

async function createInterest(req,res){
    try {
        var Interest = await INTEREST.find({name:req.body.name});
        if(Interest.length==0){
            var newInterest = await INTEREST.create({name:req.body.name,status:true});
            await USER.findByIdAndUpdate(req.data._id,{
                $addToSet:{interests:newInterest._id}
            });
            responseManagement.sendResponse(res,httpStatus.CREATED,"Interest has been updated",{});
        }else{
            await USER.findByIdAndUpdate(req.data._id,{
                $addToSet:{interests:Interest[0]._id}
            });
            responseManagement.sendResponse(res,httpStatus.CREATED,"Interest has been updated",{});
        }
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function deleteInterest(req,res){
    try {
        await USER.findByIdAndUpdate(req.data._id,{
            $pull:{interests:req.body.id}
        });
        
        responseManagement.sendResponse(res,httpStatus.OK,"Interest has been deleted",{});
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function getInterests(req,res){
    try {
        var data = await USER.findById(req.data._id,{interests:1,_id:0}).populate({path:'interests',select:{"name":1,_id:1}});
        responseManagement.sendResponse(res,httpStatus.OK,"",data);
    
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}


module.exports = {
    createInterest,
    deleteInterest,
    getInterests,
}


