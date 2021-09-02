const User = require('../models/user');
const Post = require('../models/post');
const global = require('../resources/lang/en/global');
const httpStatus = require("http-status-codes");
const responseManagement = require('../lib/responseManagement');
const Countries = require('../models/countries');
const States = require('../models/states');
const Cities = require('../models/cities');
const College = require('../models/college');
const Interest = require('../models/interest');
const Skill = require('../models/skill');
const fs = require('fs');
const path  = require('path');

/**** setup user profile ****/
module.exports.setProfile = async (req, res) => {
    try {
        // get new created key in req.body
        const { newCollege, newSkill, newInterest, ...bodyContent } = req.body;
        bodyContent.profile_setup = true;
        // if (newCollege) {
        //     let col = await College(newCollege);
        //     col.isAutonomous = true;
        //     col.save();
        // }
        if (newInterest && newInterest.length) {
            let createdInterest = await Interest.insertMany(newInterest);
            let interestIDS = [];
            createdInterest.map((item) => {
                interestIDS.push(item._id);
            })
            bodyContent.interests.push(interestIDS);
        }
        if (newSkill && newSkill.length) {
            let createdSkill = await Skill.insertMany(newSkill);
            let skillIDS = [];
            createdSkill.map((item) => {
                skillIDS.push(item._id);
            })
            bodyContent.skills.push(skillIDS);
        }

        const user = await User.findOneAndUpdate({ _id: req.data._id }, bodyContent);
        const user_data = {
                id: user._id,
                name: user.first_name + ' ' + user.last_name,
                email: user.email,
                mobile: user.mobile,
                profile_setup: user.profile_setup
            };
        responseManagement.sendResponse(res, httpStatus.OK, global.profile_updated_successfully,{ user_data });

    }
    catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

/**** Current user profile ****/
// module.exports.myProfile = async (req, res) => {
//     try {
//         let user = await User.findOne(req.data._id).select(['-hash', '-salt']).lean();
//         let post = await Post.find({ posted_by: req.data._id });
//         responseManagement.sendResponse(res, httpStatus.OK, "", { user, post });
//     } catch (error) {
//         console.log(error)
//         responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
//     }
// };


/**** other user profile ****/
module.exports.otherUserProfile = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.id }).lean();
        responseManagement.sendResponse(res, httpStatus.OK, "", { user });
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

/**** User Profile for admin ****/
module.exports.userProfile = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.id })
            .populate({ path: 'interests', model: 'interest' })
            .populate({ path: 'skills', model: 'skill' });
        responseManagement.sendResponse(res, httpStatus.OK, "", { user });
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

/**** logged in User Profile  ****/
module.exports.myProfile = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.data._id })
            .select(['-hash', '-salt'])
            .populate({ path: 'interests', model: 'interest',select:{_id:1,name:1} })
            .populate({ path: 'skills', model: 'skill',select:{_id:1,name:1} })
            .populate({ path: 'course', model:'course',select:{_id:1,name:1}})
            .populate({path: 'college' ,model:'college',select:{_id:1,name:1},populate:{path:'university_id',model:'universities'}})
            .lean();
        let post = await Post.find({ posted_by: req.data._id });

        responseManagement.sendResponse(res, httpStatus.OK, "", { user, post });
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/**** country list ****/
module.exports.countries = async (req, res) => {
    try {
        let countries = await Countries.find({'name': {'$regex': req.params.country, '$options': 'i'}}).select(['id', 'name']).lean();
        responseManagement.sendResponse(res, httpStatus.OK, "",countries);
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

/**** state list ****/
module.exports.states = async (req, res) => {
    try {
        let states = await States.find({
            country_id:req.params.countryId,
            name:{'$regex': req.params.state, '$options': 'i'}
        }).lean();
        console.log(states.length);
        responseManagement.sendResponse(res, httpStatus.OK, "", states);
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/**** city list ****/
module.exports.cities = async (req, res) => {
    try {
        let cities = await Cities.find({
            'state_id':req.params.stateId,
            'name': {'$regex': req.params.city, '$options': 'i'}
        }).lean();
        responseManagement.sendResponse(res, httpStatus.OK, "",cities);
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

module.exports.addCities = async (req,res)=>{
    try {
        var file = JSON.parse(fs.readFileSync(path.normalize(__dirname+'/../countries+states+cities.json')).toString());
        for(var i=0;i<file.length;i++){
            for(var j=0;j<file[i]['states'].length;j++){
                var state = await States.find({name:file[i]['states'][j]['name']});
                for(var k=0;k<file[i]['states'][j]['cities'].length;k++)
                {
                    await Cities.create({state_id:state[0]['_id'],name:file[i]['states'][j]['cities'][k]['name']});
                }
            }
        }
        res.send("all Cities added");
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}