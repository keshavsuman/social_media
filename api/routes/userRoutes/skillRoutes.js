const express = require('express');
const USER = require('../../models/user');
const responseManagement = require('../../lib/responseManagement');
const httpStatus = require("http-status-codes");
const UserSkillController = require('../../controllers/user/skillController');
const auth = require('../../middleware/userAuth');

const router = express.Router();

router.use(auth);

router.post('/getSkills', async (req,res)=>{
    try {
        var skills  = await USER.findById(req.body.userId,{});
        responseManagement.sendResponse(res,httpStatus.OK,"",{skills:1});
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,"sfgstj");
    }
});

router.post('/createSkill',UserSkillController.createSkill);

router.post('/deleteSkill',(req,res)=>{});

module.exports = router;