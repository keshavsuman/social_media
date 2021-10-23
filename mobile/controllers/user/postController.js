
const httpStatus = require('http-status-codes');
const post = require('../../models/post');
const responseManagement = require('../../lib/responseManagement');
const comments = require('../../models/comment');
const connections = require('../../models/connections');
const mongoose = require('mongoose');
const reactions = require('../../models/reactions');
const notifications = require('../../models/notifications');
const bookmark = require('../../models/bookmarks');

async function createPost(req,res){
    try {
        await post.create({
            user:req.data._id,
            content:req.body.content,
            media_type:req.body.media_type.toLowerCase(),
            visibility:req.body.visibility.toLowerCase(),
            media_url:req.body.media_url,
            mode:req.body.mode,
            shareFrom:req.body.shareFrom
        });
        responseManagement.sendResponse(res,httpStatus.CREATED,"Post successfully created",{});
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}
async function post_details(req,res){
    try {
        var post_details = await post.findById(req.body.post_id).populate({path:'user',select:{hash:0,salt:0}});
        responseManagement.sendResponse(res,httpStatus.OK,'',post_details);
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

async function uploadMedia(req,res){
    try {
        req.file.path = req.protocol+'://younigems.in/uploads/'+req.file.filename;
        responseManagement.sendResponse(res,httpStatus.OK,'File uploaded successfully',req.file);
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function reactOnPost(req,res){
    try {
        var userpost = await post.findById(req.body.post_id).populate('user');
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
                    reaction_type:req.body.type,
                    notificationFrom:req.data._id
                });
                var updateBody ={};
                updateBody[req.body.type]=userpost[req.body.type]+1;
                updateBody['reaction_count']=userpost['reaction_count']+1; 
                await post.findByIdAndUpdate(userpost._id,{
                    $set:updateBody
                });
                responseManagement.sendResponse(res,httpStatus.OK,'reaction successfull',{});
            }else{
                await reactions.create({
                    post_id:req.body.post_id,
                    user:req.data._id,
                    reaction_type:req.body.type,
                    notificationFrom:req.data._id
                });
                var updateBody ={};
                updateBody[req.body.type]=userpost[req.body.type]+1;
                updateBody['reaction_count']=userpost['reaction_count']-1; 
                await post.findByIdAndUpdate(userpost._id,{
                    $set:updateBody
                });
                await notifications.create({
                    title:`${userpost.user.first_name} ${userpost.user.last_name} has reacted on your post`,
                    type:"REACTED",
                    description:"",
                    user:userpost.user._id,
                    notificationFrom:req.data._id
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
        var postToUpdate = await post.findById(req.body.post_id).populate('user');
        if(postToUpdate){
            var comment = await comments.create({
                post_id:req.body.post_id,
                comment:req.body.comment,
                user:req.data._id
            });
            await post.updateOne({_id:req.body.post_id},{$addToSet:{comments:comment._id}});
            await notifications.create({
                title:`commented on your post`,
                type:"COMMENTED",
                description:req.body.comment,
                user:postToUpdate.user._id,
                notificationFrom:req.data._id
            });
            responseManagement.sendResponse(res,httpStatus.OK,'Comment added',{});
        }else{
            responseManagement.sendResponse(res,httpStatus.NOT_FOUND,'post not found',{});
        }
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,comment);
    }
}

async function replyOnComment(req,res){
    try{
        var comment = await comments.findById(req.body.id).populate('user');
        var data = await comments.findByIdAndUpdate(req.body.id
            ,{
                $addToSet:{reply:{
                    reply:req.body.reply,
                    user:req.data._id
                }}
            });
        await notifications.create({
            title:`${comment.user?.first_name} replied to your comment`,
            description:req.body.comment,
            type:'COMMENT_REPLY',
            user:comment.user._id,
            notificationFrom:req.data._id
        })
        responseManagement.sendResponse(res,httpStatus.OK,'Reply added',{});
    }catch(error){
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }
}

async function contents(req,res){
    try {
        var findBody = {
            user:mongoose.Types.ObjectId(req.body.id),
            admin_approved:true,
            visibility:'public'            
        };
        var message = 'user posts';
        if(req.body.media_type!='all')
        {
            findBody.media_type=req.body.media_type   
        }
        if(req.data._id==req.body.id)
        {   
            message='my posts'
        }else{
            var connectionData = await connections.find({user:req.data._id});
            if(connectionData[0].connections.some(c=>c.equals(req.body.id)))
            {
                findBody.visibility='private'
            }
        }
        var posts = await post.aggregate([{
            $match:findBody
        },
        {
        '$lookup': {
            'from': 'users', 
            'localField': 'user', 
            'foreignField': '_id', 
            'as': 'user'
        }
        },
        {
            $lookup: {
                'from': 'courses', 
                'localField': 'user.course', 
                'foreignField': '_id', 
                'as': 'course'
            },
        },
        {
            '$addFields': {
                'totalComments':{
                    '$size':'$comments'
                },
                'course':{$first:'$course'},
                'user':{$first:'$user'}

            }
        },
        {
            $project:{
                myuser:0,
                comments:0,
                __v:0,
                'user.hash':0,
                'user.salt':0,
                'user.__v':0
            }
        }
    ]); 

    responseManagement.sendResponse(res,httpStatus.OK,message,posts);
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
}
async function timelineposts(req,res){
    try {
        var timelineposts;
        var connectionDocument = await connections.find({user:req.data._id});
        if(connectionDocument.length==0)
        {
            responseManagement.sendResponse(res,httpStatus.OK,'Connection document not found in database');
        }else{
            if(req.body.media_type.toLowerCase()=='all'){
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
                            'totalComments':{
                                '$size':'$comments'
                            }
                        }
                        }, {
                        '$match': {
                            $or:[
                                {
                                    'user._id':{
                                        '$in':connectionDocument[0].connections
                                    }                            },
                                {
                                    'user._id':{
                                        '$in':connectionDocument[0].followings
                                    }
                                },
                                
                                {
                                    'user._id':mongoose.Types.ObjectId(req.data._id)
                                }
                            ],
                            admin_approved:true
                        }
                        },
                        {
                            $lookup: {
                                'from': 'courses', 
                                'localField': 'user.course', 
                                'foreignField': '_id', 
                                'as': 'course'
                            },
                        },
                        {
                            '$addFields': {
                                'course':{
                                        $first:'$course'
                                    },
                                }
                            },
                        {
                            $sort:{
                                createdAt: -1
                            }
                        },
                        {
                            $project:{
                                myuser:0,
                                comments:0,
                                __v:0,
                                'user.hash':0,
                                'user.salt':0,
                                'user.__v':0
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
                        'totalComments':{
                            '$size':'$comments'
                        }
                    }
                    }, {
                    '$match': {
                        $or:[
                            {
                            'user._id': {
                                '$in': connectionDocument[0].connections
                                }
                            },
                            {
                                'user._id':{
                                    '$in':connectionDocument[0].followings
                                }
                            },
                            
                            {
                                'user._id':mongoose.Types.ObjectId(req.data._id)
                            }
                        ],
                        media_type:req.body.media_type,
                        admin_approved:true
                    }
                    },
                    {
                        $lookup: {
                            'from': 'courses', 
                            'localField': 'user.course', 
                            'foreignField': '_id', 
                            'as': 'course'
                        },
                    },
                    {
                        '$addFields': {
                            'course':{
                                    $first:'$course'
                                },
                            }
                        },
                    {
                        $sort:{
                            createdAt: -1
                        }
                    },
                    {
                        $project:{
                            myuser:0,
                            comments:0,
                            __v:0,
                            'user.hash':0,
                            'user.salt':0,
                            'user.__v':0
                        }
                    }
            ]);
            }
            var postIds = []; 
            var reactedPost = [];

            timelineposts.forEach(t=>{
                postIds.push(t._id);
            });
            var reaction = await reactions.find({
                user:mongoose.Types.ObjectId(req.data._id),
                post_id:{$in:postIds}
            });
            reaction.forEach(tp=>{
                if(postIds.some(p=>p._id.equals(tp.post_id))){
                    reactedPost.push(tp.post_id);
                }
            });
            var timelinepost = [];
            timelineposts.forEach(tp=>{
                var isReacted = false;
                if(reactedPost.some(p=>p.equals(tp._id))){
                    isReacted = true;
                }
                timelinepost.push({...tp,isReacted:isReacted});
            });
            
            responseManagement.sendResponse(res,httpStatus.OK,'',timelinepost);
        }
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
}
async function getCommentsReply(req,res){
    try {
        var replies = await comments.findById(req.body.commentId,{reply:1,_id:0}).populate({path:'reply.user',select:{first_name:1,last_name:1,profile_pic:1}});
        responseManagement.sendResponse(res,httpStatus.OK,'',replies.reply);
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
}
async function bookmarkPost(req,res){
    try {
        await bookmark.findOneAndUpdate({
            user:mongoose.Types.ObjectId(req.data._id)
        },{
            $addToSet:{post_id:req.body.id}
        });
        responseManagement.sendResponse(res,httpStatus.OK,'Bookmark saved',{});
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
}

async function getBookmarks(req,res){
    try {
        var posts = await bookmark.findOne({
            user:mongoose.Types.ObjectId(req.data._id) 
        }).populate({path:'post_id',populate:{path:'user',select:{hash:0,salt:0},populate:'course'}});
        responseManagement.sendResponse(res,httpStatus.OK,'Bookmarks list',posts.post_id);
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
}

async function removebookmark(req,res){
    try {
        await bookmark.findOneAndUpdate({
            user:mongoose.Types.ObjectId(req.data._id)
        },{
            $pull:{posts:mongoose.Types.ObjectId(req.body.id)}
        });
        responseManagement.sendResponse(res,httpStatus.OK,'Bookmark removed',{});
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
    uploadMedia,
    reactOnPost,
    comment,
    replyOnComment,
    getCommentsReply,
    getComments,
    contents,
    timelineposts,
    bookmarkPost,
    getBookmarks,
    removebookmark,
    post_details
}