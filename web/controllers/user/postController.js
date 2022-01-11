
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
        req.body.mode = req.body.mode?req.body.mode:'create';
        if( req.data._id == req.body.post_id){
            responseManagement.sendResponse(res,httpStatus.EXPECTATION_FAILED,"You can't Share your post",{});
            return;
        }
        if(req.body.mode==='create'){
            const mypost = await post.create({
                user:req.data._id,
                content:req.body.content,
                media_type:req.body.media_type.toLowerCase(),
                visibility:req.body.visibility.toLowerCase(),
                media_url:req.body.media_url,
                mode:req.body.mode,
            });
            const myconnections = await connections.findOne({user:req.data._id});
            const connectionIds = [...myconnections.followers,...myconnections.connections];
            connectionIds.forEach(async (follower) => {
                await notifications.create({
                    title:`has made a post`,
                    type:"NEW_POST",
                    description:"",
                    user:follower,
                    post:mypost._id,
                    notificationFrom:req.data._id
                });
            });
            responseManagement.sendResponse(res,httpStatus.CREATED,"Post successfully created",{});
            return;
        }else if(req.body.mode==='share'){
            const mypost = await post.findById(req.body.post_id);
            const sharedPost = await post.create({
                user:req.data._id,
                content:req.body.content,
                media_type:mypost.media_type,
                visibility:mypost.visibility,
                media_url:mypost.media_url,
                mode:req.body.mode,
                shareFrom:mypost.user
            });
            const connections = await connections.findOne({user:req.data._id});
            const connectionIds = [...connections.follower,...connections.connections];
            connectionIds.forEach(async (follower) => {
                await notifications.create({
                    title:`has shared a post`,
                    type:"NEW_POST",
                    description:"",
                    user:follower,
                    post:sharedPost._id,
                    notificationFrom:req.data._id
                });
            });
            responseManagement.sendResponse(res,httpStatus.CREATED,"Post successfully shared",{});
        }
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,{});
    }}
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
        console.log(req.file);
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
            if(req.body.type==='NONE'){
                await reactions.findByIdAndDelete(userReaction[0]._id);
                var updateBody ={};
                updateBody[userReaction[0].reaction_type]=userpost[userReaction[0].reaction_type]-1;
                updateBody['reaction_count']=userpost['reaction_count']-1; 
                await post.findByIdAndUpdate(userpost._id,{
                    $set:updateBody
                });
                responseManagement.sendResponse(res,httpStatus.OK,'Reaction removed',{
                    reaction_count:userpost['reaction_count']-1,
                    reactionType:'NONE'
                });
                return;
            }   
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
                updateBody[userReaction[0].reaction_type]=userpost[userReaction[0].reaction_type]-1;
                await post.findByIdAndUpdate(userpost._id,{
                    $set:updateBody
                });
                responseManagement.sendResponse(res,httpStatus.OK,'reaction successfull',{
                    reactionCount:userpost['reaction_count'],
                    type:req.body.type
                });
            }else if(userReaction.length==0){
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
                await notifications.create({
                    title:` has reacted on your post`,
                    type:"REACTED",
                    description:"",
                    user:userpost.user._id,
                    notificationFrom:req.data._id
                });
                responseManagement.sendResponse(res,httpStatus.OK,'reaction successfull',{
                    reactionCount:updateBody['reaction_count']
                });
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
                title:`comment on your post`,
                type:"COMMENTED",
                description:req.body.comment,
                user:postToUpdate.user._id
            });
            responseManagement.sendResponse(res,httpStatus.OK,'Comment added',comment);
        }else{
            responseManagement.sendResponse(res,httpStatus.OK,'post not found',{});
        }
    } catch (error) {
        console.log(error);
        responseManagement.sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,error.message,error);
    }
}
 
async function replyOnComment(req,res){
    try{
        var rep = await comments.create({
            comment_id:req.body.comment_id,
            comment:req.body.reply,
            user:req.data._id
        });
        var data = await comments.findByIdAndUpdate(req.body.id
            ,{
                $addToSet:{reply:rep._id}
            });
        await notifications.create({
            title:`replied to your comment`,
            description:req.body.comment,
            type:'COMMENT_REPLY',
            user:data.user._id,
            notificationFrom:req.data._id
        })
        responseManagement.sendResponse(res,httpStatus.OK,'Reply added',rep);
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
            visibility:'public',
            mode:'create'            
        };
        var message = 'user posts';
        if(req.body.media_type!='all')
        {
            findBody.media_type=req.body.media_type   
        }
        if(req.data._id==req.body.id)
        {   
            message='my posts';
            delete findBody.visibility;
        }else{
            var connectionData = await connections.find({user:req.data._id});
            if(connectionData[0].connections.some(c=>c.equals(req.body.id)))
            {
                delete findBody.visibility;
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
            'as': 'user',
            'pipeline':[
                {
                  $lookup:{
                      from: 'skills',
                      localField: 'skills',
                      foreignField: '_id',
                      as: 'skills'
                    },
                  $lookup:{
                    from: 'interests',
                    localField: 'interests',
                    foreignField: '_id',
                    as: 'interests'
                  }  
                }]
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
        },{
            $limit:req.body.limit??20
        },
        {
            $skip:req.body.skip??0
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
                        },
                        },{
                            '$lookup': {
                            'from': 'posts', 
                            'localField': 'sharedPostId', 
                            'foreignField': '_id', 
                            'as': 'sharedPost',
                            'pipeline':[{
                                '$lookup': {
                                    'from': 'users',
                                    'localField': 'user',
                                    'foreignField': '_id',
                                    'as': 'user',
                                }},
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
                                        'user':{
                                            $first:'$user'
                                        },
                                        'course':{
                                            $first:'$course'
                                        }
                                    }
                                },{
                                    $project:{
                                        'user.hash':0,
                                        'user.salt':0,
                                        'user.__v':0,
                                        // 'user.course':0,
                                    }
                                }
                            ]
                            }  
                        },
                         {
                        '$addFields': {
                            'user':{
                                $first:'$myuser'
                            },
                            'totalComments':{
                                '$size':'$comments'
                            },
                            'sharedPost':{
                                $first:'$sharedPost'
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
                            $skip:req.body.skip??0
                        },
                        {
                            $limit:req.body.limit??5
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
                    },
                    {
                        '$lookup': {
                        'from': 'posts', 
                        'localField': 'sharedPostId', 
                        'foreignField': '_id', 
                        'as': 'sharedPost',
                        'pipeline':[{
                            '$lookup': {
                                'from': 'users',
                                'localField': 'user',
                                'foreignField': '_id',
                                'as': 'user',
                            }},
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
                                    'user':{
                                        $first:'$user'
                                    },
                                    'course':{
                                        $first:'$course'
                                    }
                                }
                            },{
                                $project:{
                                    'user.hash':0,
                                    'user.salt':0,
                                    'user.__v':0,
                                    // 'user.course':0,
                                }
                            }
                        ]
                        }  
                    },
                    {
                    '$addFields': {
                        'user':{
                            $first:'$myuser'
                        },
                        'sharedPost':{
                            $first:'$sharedPost'
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
                        $skip:req.body.skip??0
                    },
                    {
                        $limit:req.body.limit??5
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
            var bookmarks = await bookmark.find({
                user:mongoose.Types.ObjectId(req.data._id),
                post_id:{$in:postIds}
            });
            reaction.forEach(tp=>{
                if(postIds.some(p=>p._id.equals(tp.post_id))){
                    reactedPost.push({_id:tp.post_id,type:tp.reaction_type});
                }
            });
            var timelinepost = [];
            timelineposts.forEach(tp=>{
                var isReacted = false;
                var type;
                var isBookmarked = false;
                var isMyPost = false;
                if(tp._id==req.data._id){
                    isMyPost = true;
                }
                reactedPost.forEach(rp=>{
                    if(rp._id.equals(tp._id)){
                        isReacted = true;
                        type = rp.type;
                    }
                });
                bookmarks.forEach(b=>{
                    if(b.post_id.includes(tp._id)){
                        isBookmarked = true;
                    }
                });
                timelinepost.push({...tp,isReacted:isReacted,reactionType:type,isBookmarked:isBookmarked,isMyPost});
            });
            responseManagement.sendResponse(res,httpStatus.OK,'',timelinepost);
        }
    } catch (error) {
        console.log(error);
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
        if(req.body.post_id){
            await bookmark.findOneAndUpdate({
                user:mongoose.Types.ObjectId(req.data._id)
            },{
                $addToSet:{post_id:mongoose.Types.ObjectId(req.body.post_id)}
            });
            responseManagement.sendResponse(res,httpStatus.OK,'Bookmark saved',{});
        }else{
            responseManagement.sendResponse(res,httpStatus.BAD_REQUEST,'Post Id indefined',{});
        }
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
        var bookmarks = posts.post_id.map(p=>{
            return {...p.toObject(),course:p.user.course,isMyPost:p.user._id.equals(req.data._id)};
        });
        responseManagement.sendResponse(res,httpStatus.OK,'Bookmarks list',bookmarks);
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
}

async function removebookmark(req,res){
    try {
        if(req.body.post_id){
            await bookmark.findOneAndUpdate({
                user:mongoose.Types.ObjectId(req.data._id)
            },{
                $pull:{post_id:mongoose.Types.ObjectId(req.body.post_id)}
            });
            responseManagement.sendResponse(res,httpStatus.OK,'Bookmark removed',{});
        }else{
            responseManagement.sendResponse(res,httpStatus.BAD_REQUEST,'Bookmark Not removed',{});

        }
    } catch (error) {
        console.log(error.message);
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message,{});
    }
}

async function shareList(req,res){
    try {
        var posts = await post.find({
            user:mongoose.Types.ObjectId(req.data._id),
            mode:'share',
        });
        responseManagement.sendResponse(res,httpStatus.OK,'Shared list',posts);
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
    getComments,
    getCommentsReply,
    contents,
    timelineposts,
    bookmarkPost,
    getBookmarks,
    removebookmark,
    post_details,
    shareList

}
