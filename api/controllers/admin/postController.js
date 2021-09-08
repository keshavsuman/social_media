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
		let posts;
		if(req.params.type=='approved')
		{
			posts = await Post.find({admin_approved:true}).sort({createdAt:-1});
		}else{
			posts = await Post.find({admin_approved:false}).sort({createdAt:-1});
		}
		responseManagement.sendResponse(res, httpStatus.OK,'',posts);
	}
	catch(error){
		console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}	
};


module.exports.deletePost = async (req,res)=>{
	try {
		var post = await Post.findById(req.body.id);
		if(post){
			await Post.findByIdAndDelete(req.body.id);
			responseManagement.sendResponse(res, httpStatus.OK,'post deleted',{});
		}else{
			responseManagement.sendResponse(res, httpStatus.OK,'can\'t find post',{});
		}
	} catch (error) {
		console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
	}
}
