
const httpStatus = require('http-status-codes');
const post = require('../../models/post');
const responseManagement = require('../../lib/responseManagement');
const comments = require('../../models/comment');
const connections = require('../../models/connections');
const mongoose = require('mongoose');
const reactions = require('../../models/reactions');

async function createPost(req,res){
    try {
        await post.create({
            user:req.data._id,
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
             user:req.data._id,
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
        req.file.path = req.protocol+'://13.127.217.154/'+req.file.path;
        responseManagement.sendResponse(res,httpStatus.OK,'',req.file);
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function reactOnPost(req,res){
    try {
        var userpost = await post.findById(req.body.post_id);
        if(userpost)
        {
            var userReaction = await reactions.find({post_id:req.body.post_id,user:req.data._id});
            if(userReaction.length>0 && userReaction[0].reaction_type==req.body.type)
            {
                responseManagement.sendResponse(res,httpStatus.PRECONDITION_FAILED,'reaction already exits',{});
            }else if(userReaction.length>0 && userReaction[0].reaction_type!=req.body.type)
            {
                await reactions.findByIdAndDelete(userReaction[0]._id);
                await reactions.create({
                    post_id:req.body.post_id,
                    user:req.data._id,
                    reaction_type:req.body.type
                });
                var updateBody ={};
                updateBody=[req.body.type]=userpost[req.body.type]+1;
                await post.findByIdAndUpdate(userpost._id,{
                    $set:updateBody
                });
                responseManagement.sendResponse(res,httpStatus.OK,'reaction successfull',{});
            }else{
                await reactions.create({
                    post_id:req.body.post_id,
                    user:req.data._id,
                    reaction_type:req.body.type
                });
                var updateBody ={};
                updateBody[req.body.type]=userpost[req.body.type]+1;
                await post.findByIdAndUpdate(userpost._id,{
                    $set:updateBody
                });
                responseManagement.sendResponse(res,httpStatus.OK,'reaction successfull',{});
            }
        }else{
            responseManagement.sendResponse(res,httpStatus.UNPROCESSABLE_ENTITY,'post doesn\'t exits',{});        }
        } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function getComments(req,res){
    try{
        var comment = await comments.find({post_id:req.body.post_id},{updatedAt:0,__v:0}).populate({path:'user',select:{
            _id:1,
            first_name:1,
            last_name:1,
            profile_pic:1
        }});
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
                user:req.data._id
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

async function contents(req,res){
    try {
        var posts = await post.find({
            user:req.body.id,
            media_type:req.body.type
        }).populate({path:'user',select:{hash:0,salt:0}}).limit(50);
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
                        'localField': 'user', 
                        'foreignField': '_id', 
                        'as': 'myuser'
                      }
                    }, {
                      '$addFields': {
                        'user':{
                            $first:'$myuser'
                        },
                        'college': {
                          '$first': '$myuser.college'
                        }, 
                        'course': {
                          '$first': '$myuser.course'
                        },
                        'totalComments':{
                            '$size':'$comments'
                          }
                      }
                    }, {
                      '$match': {
                        $or:[
                            {
                            'user': {
                                '$in': connectionDocument[0].connections
                                }
                            },
                            {
                                'user':{
                                    '$in':connectionDocument[0].followers
                                }
                            },
                            {
                                'college': mongoose.Types.ObjectId(req.data.college)
                            },
                            {
                                'user':mongoose.Types.ObjectId(req.data._id)
                            }
                        ],
                        admin_approved:true
                      }
                    },
                    {
                        $lookup: {
                               'from': 'courses', 
                               'localField': 'course', 
                               'foreignField': '_id', 
                               'as': 'course'
                           },
                       },
                    {
                        $sort:{
                            createdAt: -1
                        }
                    },
                    {
                        $project:{
                            comments:0,
                            __v:0,
                            
                        }
                    }
            ]);
        }else{
            timelineposts = await post.aggregate([
                {
                  '$lookup': {
                    'from': 'users', 
                    'localField': 'user', 
                    'foreignField': '_id', 
                    'as': 'myuser'
                  }
                }, {
                  '$addFields': {
                    'user':{
                        $first:'$myuser'
                    },
                    'college': {
                      '$first': '$myuser.college'
                    }, 
                    'course': {
                      '$first': '$myuser.course'
                    },
                    'totalComments':{
                        '$size':'$comments'
                      }
                  }
                }, {
                  '$match': {
                    $or:[
                        {
                        'user': {
                            '$in': connectionDocument[0].connections
                            }
                        },
                        {
                            'user':{
                                '$in':connectionDocument[0].followers
                            }
                        },
                        {
                            'college': mongoose.Types.ObjectId(req.data.college)
                        },
                        {
                            'user':mongoose.Types.ObjectId(req.data._id)
                        }
                    ],
                    media_type:req.body.type,
                    admin_approved:true
                  }
                },
                {
                    $lookup: {
                           'from': 'courses', 
                           'localField': 'course', 
                           'foreignField': '_id', 
                           'as': 'course'
                       },
                   },
                {
                    $sort:{
                        createdAt: -1
                    }
                },
                {
                    $project:{
                        comments:-1
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
    contents,
    timelineposts
}