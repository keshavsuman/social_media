const httpStatus = require("http-status-codes");
const User = require('../models/user');
const global = require('../resources/lang/en/global');
const responseManagement = require('../lib/responseManagement');
const University = require('../models/university');
const Interest = require('../models/interest');
const Skill = require('../models/skill');
const College = require('../models/college');



/**** Count users for admin [dashboard] ****/
module.exports.dashboardData = async (req, res) => {
    try {
        let usersCount = await User.countDocuments();
        let universityCount = await University.countDocuments();
        let interestCount = await Interest.countDocuments();
        let skillCount = await Skill.countDocuments();
        let collegeCount = await College.countDocuments();
        // let latest_users_created = await User.find(
        //     {
        //         "createdAt": 
        //         {
        //             $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
        //         }
        //     }
        //     ).sort({ "date": -1 })

        responseManagement.sendResponse(res, httpStatus.OK, '', { usersCount, universityCount, interestCount, skillCount, collegeCount });

    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
}