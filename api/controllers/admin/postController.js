const Post = require('../../models/post');
// const User = require('../../models/user');
const global = require('../../resources/lang/en/global');
const httpStatus = require("http-status-codes");
const responseManagement = require('../../lib/responseManagement');

module.exports.changePostStatus = async (req,res)=>{
	try{
		let post = await Post.findOne({ _id: req.body.id });
		if (!post) {
			responseManagement.sendResponse(res, httpStatus.BAD_REQUEST, global.post_not_exist);
		} else {
			post.admin_approved = post.admin_approved == true ? false : true;
			post.save();
			responseManagement.sendResponse(res, httpStatus.OK, global.status_updated, { post });
		}
	}
	catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
}
module.exports.createPost = async (req, res) => {
	try {
		req.body.author = req.data._id;
		await Post.create(req.body);
		responseManagement.sendResponse(res, httpStatus.OK, global.post_created);
	}
	catch (error) {
		console.log(error)
		responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
};

/**** user posts list for admin to approve ****/
module.exports.adminPostsList = async (req,res) =>{
	try{
		let posts = await Post.find({admin_approved:false});
		responseManagement.sendResponse(res, httpStatus.OK,{posts});
	}
	catch(error){
		console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}	
};
