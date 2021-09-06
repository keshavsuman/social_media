const config = require('../config/config');
const httpStatus = require("http-status-codes");
const Admin = require('../models/admin');
const AdminToken = require('../models/admin_token');
const AdminPWDToken = require('../models/admin_password_token');
const Role = require('../models/role');
const ObjectId = require('mongoose').Types.ObjectId;
const global = require('../resources/lang/en/global');
const helper = require('../helper/helper');
const ejs = require('ejs');
const path = require('path');
const responseManagement = require('../lib/responseManagement');
const Permission = require('../models/permission');

// let admin = new Admin({email: "admin@social.com", name: "admin", mobile:"9156156144"});
// admin.setPassword("Admin@123");
// // console.log(admin);
// admin.save()
/****** Login ****/
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Admin.findOne({ email }).populate({ path: 'role_id', select: ['name'], model: 'role' });
        if (user) {
            if (user.validPassword(password)) {
                if (user.status) {
                    const token = await user.generateJWT();
                    var req_ip = req.connection.remoteAddress.split(":")[3] || '';
                    let atoken = new AdminToken({ admin_id: user.id, token, req_ip, user_agent: req.headers['user-agent'] });
                    const result = await atoken.save();
                    const user_data = {
                        _id: user._id,
                        name: user.name,
                        mobile: user.mobile,
                        role:user.role_id.name
                    };
                    responseManagement.sendResponse(res, httpStatus.OK, global.logged_in_successful, { "token": token, user_data })

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


/****** Forgot Password ****/
module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Admin.findOne({ email });
        if (user) {
            const token = require('crypto').randomBytes(32).toString('hex');
            const aptoken = new AdminPWDToken({ admin_id: user._id, token, email: user.email });
            const result = await aptoken.save();
            const password_reset_link = config.adminResetPasswordLink + token;
            if (result) {
                const html = await ejs.renderFile(path.join(__dirname, '../helper/email_templates/password_reset.html'), { password_reset_link });
                const to = [user.email];
                const subject = 'Younity - Reset your account password';
                const emailResult = await helper.sendEmail(to, subject, html);
                if (emailResult) {
                    responseManagement.sendResponse(res, httpStatus.OK, global.password_reset_link)
                } else {
                    responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.something_went_wrong)
                }
            } else {
                responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
            }
        } else {
            responseManagement.sendResponse(res, httpStatus.UNAUTHORIZED, global.invalid_email)
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
        const ptoken = await AdminPWDToken.findOne({ token });
        if (ptoken) {
            const user = await Admin.findOne({ _id: ptoken.admin_id });
            if (user) {
                user.setPassword(password);
                const result = await Admin.updateOne({ _id: user._id }, user);
                if (result) {
                    await AdminPWDToken.deleteOne({ _id: ptoken._id });
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
/****** Logout ****/
module.exports.logout = async (req, res) => {
    try {
        let result = await AdminToken.deleteOne({ admin_id: req.data._id, token: req.token });
        if (result) {
            responseManagement.sendResponse(res, httpStatus.OK, global.logged_out_successful);
        }
        else {
            responseManagement.sendResponse(res, httpStatus.UNAUTHORIZED, global.internal_server_error);
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

/****** Get Roles ****/
module.exports.getRoles = async (req, res) => {
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
        const roles = await Role.find({ $and: [query1] }, {}, { sort: sort_q, skip: start, limit: length });
        const total = await Role.countDocuments({});
        const stotal = await Role.countDocuments({ $and: [query1] });
        res.send({ status: httpStatus.OK, roles: roles, draw: draw, recordsTotal: total, recordsFiltered: stotal })
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/****** Add Role ****/
module.exports.addRole = async (req, res) => {
    try {
        const { name, modules } = req.body;
        const role = new Role({ name, permissions: modules });
        const result = await role.save();
        if (result) {
            responseManagement.sendResponse(res, httpStatus.OK, global.role_add_successfully);
        } else {
            responseManagement.sendResponse(res, httpStatus.UNAUTHORIZED, global.internal_server_error);
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};



/****** Delete Role ****/
module.exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findOne({ _id: req.query._id });
        if (role) {
            const result = await Role.deleteOne({ _id: req.query.id });
            responseManagement.sendResponse(res, httpStatus.OK, global.deleted_role_successfully);
        } else {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.invalid_user_id)
        }
    } catch (error) {
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/****** Edit Role ****/
module.exports.editRole = async (req, res) => {
    try {
        const role = await Role.findOne({ _id: req.query._id });
        if (role) {
            responseManagement.sendResponse(res, httpStatus.OK, '', { role });
        } else {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.invalid_user_id)
        }
    } catch (error) {
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

/****** Roles ****/
module.exports.roles = async (req, res) => {
    try {
        const roles = await Role.find({status:true});
        res.send({ status: httpStatus.OK, roles: roles })
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

/***** Permissions list *****/
module.exports.permissionList = async (req,res) => {
    try{
        const permission = await Permission.find();
        res.send({ status: httpStatus.OK, permission: permission })
    }catch(error){
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

/***** add permission ****/
module.exports.addPermission = async (req,res) => {
    try{
        const permission = await Permission.findOne({name:req.body.name});
        if(permission){
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.permission_already_exist);
        } else {
            await Permission.create(req.body);
            responseManagement.sendResponse(res, httpStatus.OK);
        }
    }
    catch(error){    
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/****** Update Role ****/
module.exports.updateRole = async (req, res) => {
    try {
        const { _id, name, modules } = req.body;
        const result = await Role.updateOne({ _id: _id }, { name, permissions: modules });
        if (result) {
            responseManagement.sendResponse(res, httpStatus.OK, global.role_update_successfully);
        } else {
            responseManagement.sendResponse(res, httpStatus.UNAUTHORIZED, global.internal_server_error);
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};



/****** Admins ****/
module.exports.admins = async (req, res) => {
    try {
        // const { start, length, columns, order, search, draw } = req.body.data;
        // const sortColumn = columns[order[0].column].data;
        // const sortOrder = order[0].dir;
        // const searchValue = search.value;
        // var search_query = [];
        // for (var i = 0; i < columns.length; i++) {
        //     if (columns[i].searchable) {
        //         var key = columns[i]['name']
        //         search_query.push({
        //             [key]: { '$regex': searchValue, '$options': 'i' }
        //         });
        //     }
        // }
        // var sort_q = {
        //     [sortColumn]: sortOrder
        // }
        // var query1;
        // if (searchValue) {
        //     query1 = { $or: search_query };
        // } else {
        //     query1 = {};
        // }
        // const role = await Role.findOne({ name:"superadmin" }); //,   { role_id:{ $ne: role._id } },
        // const admins = await Admin.find({ $and: [{ role_id: { $ne: null } },{ _id:{ $ne: req.data._id }}, query1] }, {}, { sort: sort_q, skip: start, limit: length }).populate({ path: 'role_id', select: ['name'], model: 'role' });
        // const total = await Admin.countDocuments({$and:[{ role_id: { $ne: null } },{ _id:{ $ne: req.data._id } },]});
        // const stotal = await Admin.countDocuments({ $and: [{ role_id: { $ne: null } },{ _id:{ $ne: req.data._id } }, query1] });
        // res.send({ status: httpStatus.OK, admins: admins, draw: draw, recordsTotal: total, recordsFiltered: stotal })

        var admins  = await Admin.find({
            name:{ '$regex': req.body.searchValue, '$options': 'i' },
        },{hash:0,salt:0}).limit(50);
        var totalAdmins = await Admin.countDocuments();
        responseManagement.sendResponse(res,httpStatus.OK,'',{admin:admins,totalAdmins:totalAdmins});

    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/****** Delete Admin ****/
module.exports.deleteAdmin = async (req, res) => {
    try {
        const user = await Admin.findOne({ _id: req.query.id });
        if (user) {
            const result = await Admin.deleteOne({ _id: req.query.id });
            responseManagement.sendResponse(res, httpStatus.OK, global.deleted_user_successfully);
        } else {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.invalid_user_id)
        }
    } catch (error) {
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

/****** Create Admin ****/
module.exports.createAdmin = async (req, res) => {
    try {
        const { email, mobile } = req.body;
        const user = await Admin.findOne({ $or: [{ email }, { mobile }] });
        if (user) {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.email_or_mobile_already_exist);
        } else {
            const newuser = await Admin(req.body).save();
            const token = require('crypto').randomBytes(32).toString('hex');
            const data = { admin_id: newuser._id, token, email: email };
            await AdminPWDToken(data).save();
            const password_reset_link = config.adminResetPasswordLink + token;
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


/**** Register Admin by Superadmin ****/
module.exports.registerAdmin = async(req,res) =>{
    try {
        const { email, mobile } = req.body;
        const user = await Admin.findOne({ $or: [{ email }, { mobile }] });
        if (user) {
            responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.email_or_mobile_already_exist);
        } else {
            let rawPassword = req.body.password; 
            delete req.body.password;
            const newuser = await Admin(req.body);
            newuser.setPassword(rawPassword);
            newuser.save();
            const token = require('crypto').randomBytes(32).toString('hex');
            const data = { admin_id: newuser._id, token, email: email };
            await AdminPWDToken(data).save();
            // const password_reset_link = config.adminResetPasswordLink + token;
            // const html = await ejs.renderFile(path.join(__dirname, '../helper/email_templates/password_reset.html'), { password_reset_link });
            // const to = [email];
            // const subject = 'Younity - Set your account password';
            // const emailResult = await helper.sendEmail(to, subject, html);
            responseManagement.sendResponse(res, httpStatus.OK, "Admin Created Successfully");
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};



/******Update Admin ****/
module.exports.updateAdmin = async (req, res) => {
    try {
        const user = await Admin.findOne({ _id: req.body._id });
        if (user) {
            const result = await Admin.updateOne({ _id: req.body._id }, req.body);
            responseManagement.sendResponse(res, httpStatus.OK, global.admin_update_successful);
        } else {
            responseManagement.sendResponse(res, httpStatus.UNAUTHORIZED, global.internal_server_error);
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};


/**** Toggle Admin Status ****/
module.exports.updateAdminStatus = async (req, res) => {
	try {
		let admin = await Admin.findOne({ _id: req.query._id });
		if (!admin) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.admin_not_exist);
		} else {
			admin.status = admin.status == true ? false : true;
			admin.save();
			responseManagement.sendResponse(res, httpStatus.OK, global.status_updated, { admin });
		}
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


/**** Toggle Role Status ****/
module.exports.updateRoleStatus = async (req, res) => {
	try {
		let role = await Role.findOne({ _id: req.query._id });
		if (!role) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.role_not_exist);
		} else {
			role.status = role.status == true ? false : true;
			role.save();
			responseManagement.sendResponse(res, httpStatus.OK, global.status_updated, { role });
		}
	} catch (error) {
		console.log(error);
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};


