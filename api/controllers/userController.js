const httpStatus = require("http-status-codes");
const User = require('../models/user');
const UserToken = require('../models/user_token');
const ObjectId = require('mongoose').Types.ObjectId;
const global = require('../resources/lang/en/global');
const responseManagement = require('../lib/responseManagement');
const config = require('../config/config');
const UserPWDToken = require('../models/user_token');
const helper = require('../helper/helper');
const ejs = require('ejs');
const path = require('path');
/****** Login ****/
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && user.hash && user.salt) {
            if (user.validPassword(password)) {
                if (user.status) {
                    const token = await user.generateJWT();
                    var req_ip = req.connection.remoteAddress.split(":")[3] || '';
                    let atoken = new UserToken({ user_id: user.id, token, req_ip, user_agent: req.headers['user-agent'] });
                    const result = await atoken.save();
                    const user_data = {
                        _id: user._id,
                        email: user.email,
                        mobile: user.mobile,
                        profile_setup: user.profile_setup
                    };
                    responseManagement.sendResponse(res, httpStatus.OK, global.logged_in_successful, { "token": token, user_data });
                } else {
                    responseManagement.sendResponse(res, httpStatus.UNAUTHORIZED, global.user_is_inactive);
                }
            } else {
                responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.invalid_credentials);
            }
        } else {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.invalid_credentials);
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/****** social Login ****/
module.exports.socialLogin = async (req, res) => {
    try {
        const { email, provider_type, provider_id, name, profile_pic } = req.body;
        const [first_name, last_name] = name.split(" ");
        const user = await User.findOne({ provider_id, provider_type });
        if (user) {
            await User.updateOne({ _id: user._id }, { first_name, last_name, profile_pic });
            const token = await user.generateJWT();
            var req_ip = req.connection.remoteAddress.split(":")[3] || '';
            await UserToken.create({ user_id: user._id, token, req_ip, user_agent: req.headers['user-agent'] });
            const user_data = {
                _id: user._id,
                name: user.first_name + ' ' + user.last_name,
                email: user.email,
                mobile: user.mobile,
                profile_setup: user.profile_setup
            };
            responseManagement.sendResponse(res, httpStatus.OK, global.logged_in_successful, { token: token, user_data })
        } else {
            const uuser = await User.findOne({ email });
            const nuser = await User.create({ provider_type, provider_id, first_name, last_name, email, profile_pic });
            const token = await nuser.generateJWT();
            var req_ip = req.connection.remoteAddress.split(":")[3] || '';
            const result = await UserToken.create({ user_id: nuser._id, token, req_ip, user_agent: req.headers['user-agent'] });
            responseManagement.sendResponse(res, httpStatus.OK, global.logged_in_successful, { token: token, user_data: { first_name, last_name, email, profile_pic } })
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/****** Create User(signup) ****/
module.exports.createUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.email_already_exist);
        } else {
            let password = req.body.password;
            delete req.body.password;
            const newuser = await User(req.body).save();
            newuser.setPassword(password);
            await User.updateOne({ _id: newuser._id }, newuser);
            const token = require('crypto').randomBytes(32).toString('hex');
            const data = { user_id: newuser._id, token, email: email };
            await UserPWDToken(data).save();
            // const password_reset_link = config.userResetPasswordLink + token;
            // const html = await ejs.renderFile(path.join(__dirname, '../helper/email_templates/password_reset.html'), { password_reset_link });
            // const to = [email];
            // const subject = 'Younity - Set your account password';
            // const emailResult = await helper.sendEmail(to, subject, html);
            responseManagement.sendResponse(res, httpStatus.OK, global.signup_success);
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/****** Reset Password ****/
module.exports.resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const ptoken = await UserPWDToken.findOne({ token });
        if (ptoken) {
            const user = await User.findOne({ _id: ptoken.user_id });
            if (user) {
                user.setPassword(password);
                const result = await User.updateOne({ _id: user._id }, user);
                if (result) {
                    await UserPWDToken.deleteOne({ _id: ptoken._id });
                    responseManagement.sendResponse(res, httpStatus.OK, global.password_reset_successfully)
                } else {
                    responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.something_went_wrong)
                }
            }
            else {
                responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.invalid_admin_token)
            }
        } else {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.invalid_admin_token)
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/****** Users Datatable ****/
module.exports.users = async (req, res) => {
    try {
        const { start, length, columns, order, search, draw, start_date, end_date, state } = req.body.data;
        const sortColumn = columns[order[0].column].data;
        const sortOrder = order[0].dir;
        const searchValue = search.value;
        var search_query = [];
        let filter1 = {};
        let filter2 = {};
        let filter3 = {};
        if (start_date) {
            filter1 = { "createdAt": { $gte: new Date(start_date) } }
        }
        if (end_date) {
            filter2 = { "createdAt": { $lte: new Date(end_date) } }
        }
        if (state) {
            filter3 = { "state": state }
        }

        for (var i = 0; i < columns.length; i++) {
            if (columns[i].searchable) {
                var key = columns[i]['name']
                search_query.push({
                    [key]: { '$regex': searchValue, '$options': 'i' }
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
        const users = await User.find({ $and: [query1, filter1, filter2, filter3] }, {}, { sort: sort_q, skip: start, limit: length });
        const total = await User.countDocuments();
        const stotal = await User.countDocuments({ $and: [query1, filter1, filter2, filter3] });
        res.send({ statusCode: httpStatus.OK, users: users, draw: draw, recordsTotal: total, recordsFiltered: stotal })
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};




/***** Edit User ****/
module.exports.editUser = async (req, res) => {
    try {
        const myuser = await User.findOne({ _id: req.query._id });
        if (myuser) {
            const user = {
                _id: myuser._id,
                name: myuser.name,
                email: myuser.email,
                mobile: myuser.mobile,
                status: myuser.status
            };
            responseManagement.sendResponse(res, httpStatus.OK, '', { user });
        } else {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.invalid_user_id)
        }
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

/****** Update User ****/
module.exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body._id });
        if (user) {
            const result = await User.updateOne({ _id: req.body._id }, req.body);
            responseManagement.sendResponse(res, httpStatus.OK, global.user_update_successful);
        } else {
            responseManagement.sendResponse(res, httpStatus.UNAUTHORIZED, global.internal_server_error);
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/**** Toggle User Status ****/
module.exports.updateUserStatus = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.query._id });
        if (!user) {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.user_not_exist);
        } else {
            user.status = user.status == true ? false : true;
            user.save();
            responseManagement.sendResponse(res, httpStatus.OK, global.status_updated, { user });
        }
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};