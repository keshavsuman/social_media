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
const connections = require('../models/connections');
const jwt =require('jsonwebtoken');
const notification =  require('../models/notifications');
const userToken = require('../models/user_token');
const mongoose = require('mongoose');
const bookmarks = require('../models/bookmarks');

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
                id: user._id,
                name: user.first_name + ' ' + user.last_name,
                email: user.email,
                mobile: user.mobile,
                profile_setup: user.profile_setup,
                token:token
            };
            responseManagement.sendResponse(res, httpStatus.OK, global.logged_in_successful, {"token": user_data.token,user_data});
            
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
            await connections.create({
                user:newuser._id,
                followers:[],
                followings:[],
                requests:[],
                connections:[]
            });
            await bookmarks.create({
                user:newuser._id,
                posts:[]
            });
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
module.exports.logout = (req,res)=>{
    try {
        responseManagement.sendResponse(res, httpStatus.OK,'Logout Successfull',{});
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
}
module.exports.forgetPassword = async (req,res)=>{
    try{
        var user = await User.find({email:req.body.email},{hash:0,salt:0});
        if(user.length>0){
            var token = jwt.sign({email:user[0]['email']},config.secretKey);
            const password_reset_link = config.userResetPasswordLink + token;
            const html = await ejs.renderFile(path.join(__dirname, '../helper/email_templates/password_reset.html'), { password_reset_link });
            const to = [req.body.email];
            const subject = 'Younity - Set your account reset password Link';
            // const emailResult = await helper.sendEmail(to, subject, html);
            responseManagement.sendResponse(res, httpStatus.OK,'Password Mail sent',{});
        }else{
            responseManagement.sendResponse(res, httpStatus.OK,'Can\'t find user with this email address',{});
        }
    }catch(error){
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
} 
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
module.exports.searchusers = async (req, res) => {
    try {
        var limit  = req.body.limit || 50;
        var users  = await User.find({
            $or:[
                {first_name:{ '$regex': req.body.searchValue, '$options': 'i' }},
                {last_name:{ '$regex': req.body.searchValue, '$options': 'i' }}
            ]
        },{hash:0,salt:0}).skip(req.body.after).limit(limit);
        var totalUsers = await User.countDocuments();
        responseManagement.sendResponse(res,httpStatus.OK,'',{users:users,totalUsers:totalUsers});
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
};

module.exports.users = async (req, res) => {
    try {
        var users  = await User.find({},{hash:0,salt:0}).populate('home_town').limit(50);
        var totalUsers = await User.countDocuments();
        responseManagement.sendResponse(res,httpStatus.OK,'',{users:users,totalUsers:totalUsers});
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
        const user = await User.findOne({ _id: req.data._id });
        console.log(user);
        if (user) {
            const result = await User.findByIdAndUpdate(req.data._id, req.body);
            if(result['college'] && result['course'] && result['start_date'] && result['end_date']){
                await User.updateOne({_id:req.data._id},{profile_setup:true});
            }
            responseManagement.sendResponse(res, httpStatus.OK, global.profile_updated_successfully);
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
        let user = await User.findOne({ _id: req.body.id });
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

module.exports.search = async (req,res) =>{
    try {
        var {filters} = req.body;
        var filterBody = {};
        if(req.body.keyword.length<2){
            responseManagement.sendResponse(res,httpStatus.NOT_ACCEPTABLE,"Keyword length is so small, it must have length of 2",{});
        }else{
        if(filters){
            if(filters.includes('course') && user.course){
                filterBody.course=user.course
            }
            if(filters.includes('skills')){
                filterBody.skills= {$in:user.skills}
            }
            if(filters.includes('interests')){
                filterBody.interests = {$in:user.interests}
            }
            if(filters.includes('college')&&user.course)
            {
                filterBody.college = user.college
            }
        }
        filterBody.$or = [
            {first_name:{$regex:req.body.keyword,$options:'i'}},
            {last_name:{$regex:req.body.keyword,$options:'i'}}
          ]
        filterBody._id = {$ne:mongoose.Types.ObjectId(req.data._id)};
        var searchResults = await User.aggregate([
            {
              '$match': filterBody
            }, {
              '$lookup': {
                'from': 'connections', 
                'localField': '_id', 
                'foreignField': 'user', 
                'as': 'connections'
              }
            }, {
              '$addFields': {
                'connections': {
                  '$first': '$connections'
                }
              }
            }, {
              '$addFields': {
                'isConnected': {
                  '$in': [
                    new ObjectId(req.data._id), '$connections.connections'
                  ]
                }, 
                'isFollowing': {
                  '$in': [
                    new ObjectId(req.data._id), '$connections.followings'
                  ]
                }, 
                'isRequested': {
                  '$in': [
                    new ObjectId(req.data._id), '$connections.requested'
                  ]
                }
              }
            }, {
              '$project': {
                'first_name': 1, 
                'last_name': 1, 
                'profile_pic': 1, 
                'home_town': 1, 
                'skills': 1, 
                'interests': 1, 
                'email': 1, 
                'start_date': 1, 
                'end_date': 1, 
                'college': 1, 
                'course': 1,
                'isConnected': 1, 
                'isFollowing': 1, 
                'isRequested': 1
              }
            }
          ]);
        responseManagement.sendResponse(res,httpStatus.OK,'',searchResults);
    }

        } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

module.exports.followunfollow = async  (req,res)=>{
    try {
        if(req.body.operation=='follow')
        {   
            await connections.updateOne({user:mongoose.Types.ObjectId(req.body.id)},{
                $addToSet:{followers:req.data._id}
            },{
                new:true
            });
            await connections.updateOne({user:mongoose.Types.ObjectId(req.data._id)},{
                $addToSet:{followings:req.body.id}
            },{
                new:true
            });
            var user = await User.findById(req.data._id);
            await notification.create({
                title:`${user.first_name} ${user.last_name} started following you`,
                description:'',
                type:'FOLLOWED',
                user:req.body.id
            });
            responseManagement.sendResponse(res,httpStatus.OK,'followed',{});
        }else if(req.body.operation=='unfollow')
        {
            await connections.updateOne({user:mongoose.Types.ObjectId(req.body.id)},{
                $pullAll:{followers:[mongoose.Types.ObjectId(req.data._id)]},
            },{
                new:true
            });
            await connections.updateOne({user:mongoose.Types.ObjectId(req.data._id)},{
                $pullAll:{followings:[mongoose.Types.ObjectId(req.body.id)]},
            },{
                new:true
            });
            responseManagement.sendResponse(res,httpStatus.OK,'unfollowed',{});
        }else {
            responseManagement.sendResponse(res,httpStatus.NOT_ACCEPTABLE,'operation not acceptable',{});
        }
        
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
}


module.exports.connectAcceptReject = async (req,res)=>{
    try {
        if(req.body.operation==='reject'){
            await connections.findOneAndUpdate({user:mongoose.Types.ObjectId(req.data._id)},{
                $pullAll:{requested:[req.body.id]}
            });
            responseManagement.sendResponse(res,httpStatus.OK,'rejected',{});
        }
        else if(req.body.operation==='accept'){
            await connections.findOneAndUpdate({user:mongoose.Types.ObjectId(req.data._id)},{
                $pullAll:{requested:[req.body.id]},
                $addToSet:{followings:req.body.id},
                $addToSet:{followers:req.body.id},
                $addToSet:{connections:req.body.id},
            });
            await connections.findOneAndUpdate({user:mongoose.Types.ObjectId(req.body.id)},{
                $addToSet:{followings:req.data._id},
                $addToSet:{followers:req.data._id},
                $addToSet:{connections:req.data._id},
            });
            var user = await User.findById(req.data._id,{first_name:1,last_name:1});
            await notification.create({
                title:`${user.first_name} ${user.last_name} has requested to connect`,
                type:"CONNECTION_ACCEPTED",
                description:"",
                user:req.body.id
            });
            responseManagement.sendResponse(res,httpStatus.OK,'accepted',{});
        }
        else if(req.body.operation==='connect'){
            await connections.findOneAndUpdate({user:mongoose.Types.ObjectId(req.body.id)},{
                $addToSet:{requested:req.data._id}
            });
            var user = await User.findById(req.data._id,{first_name:1,last_name:1});
            await notification.create({
                title:`${user.first_name} ${user.last_name} has requested you for connection`,
                type:"CONNECTION_REQUEST",
                description:"",
                user:req.body.id
            });
            responseManagement.sendResponse(res,httpStatus.OK,'connect request send',{});
        }else{
            responseManagement.sendResponse(res,httpStatus.NOT_ACCEPTABLE,'operation not acceptable',{});
        }
        
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
} 

module.exports.getPendingRequests = async (req,res)=>{
    try {
        var requests = await connections.find({user:req.data._id},{requested:1,_id:0})
        .populate(
            {path:'requested',
            select:{profile_pic:1,first_name:1,last_name:1,course:1},
            populate:{path:'course'}
        });
        if(requests.length>0)
        {
            responseManagement.sendResponse(res,httpStatus.OK,'',requests[0].requested);
        }else{
            responseManagement.sendResponse(res,httpStatus.NOT_FOUND,'oops...Someone deleted the Connection document from database',{});
        }
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
}

module.exports.myconnections = async (req,res)=>{
    try {
        var myconnections =  await connections.aggregate([
                    {
                      '$match': {
                        'user': mongoose.Types.ObjectId(req.data._id)
                      }
                    }, {
                      '$lookup': {
                        'from': 'users', 
                        'localField': 'connections', 
                        'foreignField': '_id', 
                        'as': 'connections'
                      }
                    }, {
                      '$project': {
                        'connections._id':1,
                        'connections.first_name': 1, 
                        'connections.last_name': 1, 
                        'connections.start_date': 1, 
                        'connections.end_date': 1, 
                        'connections.profile_pic': 1, 
                        'connections.course': 1,
                        _id:0
                      }
                    },
                     {
                      '$lookup': {
                        'from': 'courses', 
                        'localField': 'connections.course', 
                        'foreignField': '_id', 
                        'as': 'courses'
                      }
                    }
        ]); 
        var data = [];
        for (var i=0;i<myconnections[0].connections.length;i++)
        {
                var d={
                    "_id": myconnections[0].connections[i]._id,
                    "profile_pic": myconnections[0].connections[i].profile_pic,
                    "start_date": myconnections[0].connections[i].start_date,
                    "end_date": myconnections[0].connections[i].end_date,
                    "first_name": myconnections[0].connections[i].first_name,
                    "last_name": myconnections[0].connections[i].last_name,
                    "course": myconnections[0].course[i]
                }
                data.push(d);
        };
        if(myconnections.length>0){
            responseManagement.sendResponse(res, httpStatus.OK,'',data);
        }else{
            responseManagement.sendResponse(res, httpStatus.OK,'Connections not found in the database',{});
        }
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
}

module.exports.getNotifications = async (req,res)=>{
    try {
        var notifications = await notification.find({user:req.data._id}).sort({createdAt:-1}).limit(20).populate('notificationFrom',{hash:0,salt:0});
        responseManagement.sendResponse(res,httpStatus.OK,'User notification',notifications);
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
}
module.exports.deleteNotification = async (req,res)=>{
    try{
        await notification.findByIdAndDelete(req.body.id);
        responseManagement.sendResponse(res,httpStatus.OK,'User notification deleted');
    }catch(error){
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
}

module.exports.removeConnection = async (req,res)=>{
    try {
        await connections.findOneAndUpdate({user:req.data._id},{
            $pullAll:{connections:[mongoose.Types.ObjectId(req.body.id)]}
        });
        await connections.findOneAndUpdate({user:req.body.id},{
            $pullAll:{connections:[mongoose.Types.ObjectId(req.data._id)]}
        });
        responseManagement.sendResponse(res,httpStatus.OK,'disconnected',{});
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}
module.exports.peopleYouMayKnow = async (req,res)=>{
    try {
        var connects = await connections.find({user:req.data._id});
        var user = await User.findById(req.data._id,{
            course:1,
            college:1,
            home_town:1,
            _id:0
        });
        var users = await User.aggregate([{
            $match:{
                '_id':{$nin:connects[0].connections},
                '_id':{$nin:connects[0].followings},
                '_id':{$ne:mongoose.Types.ObjectId(req.data._id)},
                $or:[
                    {course:user.course},
                    {college:user.college},
                    {home_town:user.home_town}
                ],
            }},
            {
                '$lookup': {
                  'from': 'connections', 
                  'localField': '_id', 
                  'foreignField': 'user', 
                  'as': 'connections'
                }
              }, {
                '$addFields': {
                  'connections': {
                    '$first': '$connections'
                  }
                }
              }, {
                '$addFields': {
                  'isConnected': {
                    '$in': [
                      new ObjectId(req.data._id), '$connections.connections'
                    ]
                  }, 
                  'isFollowed': {
                    '$in': [
                      new ObjectId(req.data._id), '$connections.followers'
                    ]
                  }, 
                  'isRequested': {
                    '$in': [
                      new ObjectId(req.data._id), '$connections.requested'
                    ]
                  }
                }
              },
            {
                '$project': {
                    'first_name': 1, 
                    'last_name': 1, 
                    'profile_pic': 1, 
                    'home_town': 1, 
                    'skills': 1, 
                    'interests': 1, 
                    'email': 1, 
                    'start_date': 1, 
                    'end_date': 1, 
                    'college': 1, 
                    'course': 1,
                    'isConnected': 1, 
                    'isFollowed': 1, 
                    'isRequested': 1
                }
            }
        ]);

        responseManagement.sendResponse(res,httpStatus.OK,'people you may know list',users);
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

module.exports.getFollowersList = async (req,res)=>{
    try{
        if(!req.body.id){
            responseManagement.sendResponse(res,httpStatus.OK,'Please Provide user-ID',[]);
            return;
        }
        const connection = await connections.find({user:req.data._id});
        var followers = await connections.aggregate([
            {
                $match:{
                    user:mongoose.Types.ObjectId(req.data._id)
                }
            },
            {
              '$project': {
                'followers': 1, 
                '_id': 0
              }
            }, {
              '$lookup': {
                'from': 'users', 
                'localField': 'followers', 
                'foreignField': '_id', 
                'as': 'followers', 
                'pipeline': [
                  {
                    '$project': {
                      'first_name': 1, 
                      'last_name': 1, 
                      'profile_pic': 1
                    },
                },
                {
                    $addFields:{
                        isConnected:{$in:['$_id',connection[0].connections]},
                        isRequested:{$in:['$_id',connection[0].requested]},
                        isfollowing:{$in:['$_id',connection[0].followings]},
                        isfollowed:{$in:['$_id',connection[0].followers]},
                    }
                }
            ]
              }
            },{
                limit:req.body.limit??20
            },
            {
                skip:req.body.after??0
            } 
          ]);
        responseManagement.sendResponse(res,httpStatus.OK,'Followers list',followers[0].followers);
    }catch(e){
        console.log(e);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,e.message,{});
    }
}
module.exports.getFollowingList = async (req,res)=>{
    try{
        if(!req.body.id){
            responseManagement.sendResponse(res,httpStatus.OK,'Please Provide user-ID',[]);
            return;
        }
        const connection = await connections.find({user:req.data._id});
        var followings = await connections.aggregate([
            {
                $match:{
                    user:mongoose.Types.ObjectId(req.data._id)
                }
            },
            {
              '$project': {
                'followings': 1, 
                '_id': 0
              }
            }, {
              '$lookup': {
                'from': 'users', 
                'localField': 'followings', 
                'foreignField': '_id', 
                'as': 'followings', 
                'pipeline': [
                  {
                    '$project': {
                      'first_name': 1, 
                      'last_name': 1, 
                      'profile_pic': 1
                    },
                },
                {
                    $addFields:{
                        isConnected:{$in:['$_id',connection[0].connections]},
                        isRequested:{$in:['$_id',connection[0].requested]},
                        isfollowing:{$in:['$_id',connection[0].followings]},
                        isfollowed:{$in:['$_id',connection[0].followers]},
                    }
                }
            ]
              }
            },
            {
                limit:req.body.limit??20
            },{
                skip:req.body.skip??0
            } 
          ]);
        responseManagement.sendResponse(res,httpStatus.OK,'Followings list',followings[0].followings);
    }catch(e){
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}


module.exports.cancelRequest = async (req,res)=>{
    try {
        await connections.findOneAndUpdate({user:req.data._id},{
            $pullAll:{requested:[mongoose.Types.ObjectId(req.body.id)]}
        });
        responseManagement.sendResponse(res,httpStatus.OK,'Request canceled',{});

    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
}