const USER = require('../../models/user');
const responseManagement = require('../../lib/responseManagement');
const httpStatus = require("http-status-codes");
const SKILL =require('../../models/skill');

async function getSkills(req,res){
    try {
        var skills = await USER.findById(req.data._id,{skills:1,_id:0}).populate({path:'skills',select:{"name":1,_id:1}});
        console.log(skills);
        responseManagement.sendResponse(res,httpStatus.OK,"",skills);
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}
async function createSkill(req,res){
    try{
        var skills = await SKILL.find({name:req.body.name});
        if(skills.length==0){
            var newSkill = await SKILL.create({name:req.body.name,status:true});
            await USER.findByIdAndUpdate(req.data._id,{
                $addToSet:{skills:newSkill._id}
            });
            responseManagement.sendResponse(res,httpStatus.CREATED,"Skill has been updated",{});
        }else{
            await USER.findByIdAndUpdate(req.data._id,{
                $addToSet:{skills:skills[0]._id}
            });
            responseManagement.sendResponse(res,httpStatus.CREATED,"Skill has been updated",{});
        }
    }catch(error){
        console.log(error.message);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function deleteSkill(req,res){
    try{
        await USER.findByIdAndUpdate(req.data._id,{
            $pull:{skills:req.body.id}
        });
        responseManagement.sendResponse(res,httpStatus.OK,"Skill has been deleted",{});
    }catch(error){
        console.log(error.message);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

module.exports={
     getSkills,
     createSkill,
     deleteSkill
    };