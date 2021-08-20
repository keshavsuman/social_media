
const httpStatus = require('http-status-codes');
const post = require('../../models/post');

async function createPost(req,res){
    try {
        await post.create({
            author:req.findByIdAndUpdate._id,
            content:req.body.content,
            media_type:req.body.media_type,
            visibility:req.body.visibility,
            media_url:req.body.media_url
        });
        responseManagement.sendResponse(res,httpStatus.CREATED,"Post succesfully created",{});
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function deletePost(req,res){
    try {
        await post.findByIdAndDelete(req.body.postId);
        responseManagement.sendResponse(res,httpStatus.CREATED,"Post successfully deleted",{});
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function updatePost(req,res){
    try {
        await post.findByIdAndUpdate(req.body.postId,req.body);
        responseManagement.sendResponse(res,httpStatus.OK,'Post updated successfully',{});

    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function getPosts(req,res){
    try {
        var userPosts = await post.find({userId:req.findByIdAndUpdate._id}).sort({_id:-1}).limit(50);
        responseManagement.sendResponse(res,httpStatus.OK,'',userPosts);
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function uploadMedia(req,res){
    try {
        console.log(req.file);
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function likePost(req,res){
    try {
        
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function comment(req,res){
    try {
        
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function reply(req,res){
    try{

    }catch(error){
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    uploadMedia,
    likePost,
    comment,
    reply
}