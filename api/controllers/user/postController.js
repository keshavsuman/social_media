
const httpStatus = require('http-status-codes');
const post = require('../../models/post');
const responseManagement = require('../../lib/responseManagement');
const comments = require('../../models/comment');
const connections = require('../../models/connections');

async function createPost(req,res){
    try {
        await post.create({
            author:req.data._id,
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
        var userPosts = await post.find(
            {
             author:req.data._id,
             admin_approved:true,
            },  
            ).sort({_id:-1}).limit(50);
        responseManagement.sendResponse(res,httpStatus.OK,'',userPosts);
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function sharePost(req,res){
    try{
        // need to complete
    }catch(error){
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}


async function uploadMedia(req,res){
    try {
        req.file.path = req.protocol+'://13.127.215.198/'+req.file.path;
        responseManagement.sendResponse(res,httpStatus.OK,'',req.file);
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function reactOnPost(req,res){
    try {
        req.body.post_id;
        //ned to be done
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function getComments(req,res){
    try{
        var comment = await comments.find({post_id:req.body.post_id}).populate('user');
        responseManagement.sendResponse(res,httpStatus.OK,'',comment);
    }catch(error){
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}
async function comment(req,res){
    try {
        var postToUpdate = post.findById(req.body.post_id);
        if(postToUpdate){
            var comment = await comments.create({
                post_id:req.body.post_id,
                comment:req.body.comment,
                user_id:req.body.user_id
            });
            await post.updateOne({_id:req.body.post_id},{$addToSet:{comments:comment._id}})
            responseManagement.sendResponse(res,httpStatus.OK,'Comment added',{});
        }else{
            responseManagement.sendResponse(res,httpStatus.OK,'post not found',{});
        }
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,comment);
    }
}

async function replyOnComment(req,res){
    try{
        var reply = comments.findOneAndUpdate({
            _id:req.body.id
        },{
            $addToSet:{reply:{
                'reply':req.body.comment,
                'user':req.data._id,
            }}
        });
        responseManagement.sendResponse(res,httpStatus.OK,'Reply added',{});
    }catch(error){
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function myPosts(req,res){
    try {
        var posts = await post.find({user:req.data._id});
        responseManagement.sendResponse(res,httpStatus.OK,'',posts);
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
}
async function timelineposts(req,res){
    try {
        var timelineposts;
        var connectionDocument = await connections.find({user:req.data._id});
        if(req.body.type=='ALL'){
            timelineposts = await post.aggregate([
                    {
                    '$lookup': {
                        'from': 'users', 
                        'localField': 'author', 
                        'foreignField': '_id', 
                        'as': 'user'
                    }
                    }, {
                    '$addFields': {
                        'college': {
                        '$first': '$user.college'
                        }
                    }
                    },{
                    '$match': {
                        $or:[{
                            'author': {
                                '$in': connectionDocument[0].connections
                                }
                            },{
                                'author':{
                                    '$in':connectionDocument[0].followers
                                }
                            } ,{
                                'college': req.data.college
                            },
                        ],
                    }
                    },{
                        $sort:{
                            createdAt: -1
                        }
                    }
            ]);
        }else{
            timelineposts = await post.aggregate([
                {
                '$lookup': {
                    'from': 'users', 
                    'localField': 'author', 
                    'foreignField': '_id', 
                    'as': 'user'
                }
                }, {
                '$addFields': {
                    'college': {
                    '$first': '$user.college'
                    }
                }
                },{
                '$match': {
                    $or:[{
                        'author': {
                            '$in': connectionDocument[0].connections
                            }
                        },{
                            'author':{
                                '$in':connectionDocument[0].followers
                            }
                        } ,{
                            'college': req.data.college
                        },
                    ],
                    media_type:req.body.type
                }
                },{
                    $sort:{
                        createdAt: -1
                    }
                }
        ]);
        }    
        responseManagement.sendResponse(res,httpStatus.OK,'',timelineposts);
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    sharePost,
    uploadMedia,
    reactOnPost,
    comment,
    replyOnComment,
    getComments,
    myPosts,
    timelineposts
}