const jwt = require('jsonwebtoken');
const Narad = require('./narad');
const chatModel = require('../Models/chatModel');
const messageModel = require('../Models/messageModel');
const mongoose = require('mongoose');
const moment = require('moment-timezone');

class User{

    constructor(socket){
        this.socket = socket;
        this.socketId = socket.id;
        this.userId = this.getUserId();
    }

    getUserId(){
        return (jwt.verify(this.socket.handshake.auth.token, 'SXYUASDSDETLVFRPDSEA'))._id;
    }

    isOnline(userId){
        this.socket.emit('isOnline',Narad.isOnline(userId));
    }

    async sendMessage(chatId,senderId,recieverId,message){
        try{
            if(recieverId && senderId && message){
                if(chatId){
                    await chatModel.findByIdAndUpdate(chatId,{
                        lastMessage: message,
                    });
                    const mes = await messageModel.create({
                        chatId:chatId,
                        message:message,
                        senderId:senderId,
                        recieverId:recieverId,
                    });
                    var time =  moment(mes.createdAt).tz('Asia/Kolkata').calendar();
                    this.socket.emit('message-ok',{...mes.toObject(),time:time});
                    Narad.getUser(recieverId)?.socket.emit('newMessages',{...mes.toObject(),time:time});
                }else{
                    const chat = await chatModel.find({
                        users:{$all:[senderId,recieverId]}
                    });
                    if(chat.length>0){
                        chat[0].lastMessage = message;
                        chat[0].lastActive = Date.now();
                        await chat[0].save();
                        const mes = await messageModel.create({
                            chatId:chat[0]._id,
                            message:message,
                            senderId:senderId,
                            recieverId:recieverId,
                        });
                        var time = moment(mes.createdAt).tz('Asia/Kolkata').calendar();
                        this.socket.emit('message-ok',{...mes.toObject(),time:time});
                        Narad.getUser(recieverId)?.socket.emit('newMessages',{...mes.toObject(),time:time});
                    }else{
                        var users;
                        if(this.userId==senderId){
                            users = [senderId,recieverId];
                        }else{
                            users = [recieverId,senderId];
                        }

                        const newChat = await chatModel.create({
                            users:users,
                            lastMessage:message,
                        });
                        const mes = await messageModel.create({
                            chatId:newChat._id,
                            message:message,
                            senderId:senderId,
                            recieverId:recieverId,
                        });
                        var time = moment(mes.createdAt).tz('Asia/Kolkata').calendar();
                        this.socket.emit('message-ok',{...mes.toObject(),time:time});
                        Narad.getUser(recieverId)?.socket.emit('newMessages',{...mes.toObject(),time:time});
                    }
                }
                
            }else{
                this.socket.emit('error','Invalid parameters');
            }
        }catch(err){
            console.log(err);
            this.socket.emit('error',err);
        }
    }

    async getMessages(chatId,skip){
        try{
            const messages = await messageModel.find({
                chatId:chatId,
            }).sort({createdAt:-1}).limit(20).skip(skip);
            const newMessages = messages.map((m)=>{
                m.time = moment(m.createdAt).tz('Asia/Kolkata').calendar();
                return {...m.toObject(),time:m.time};
            });
            this.socket.emit('fetch-messages-ok',newMessages.reverse()??[]);
        }catch(err){
            console.log(err);
            this.socket.emit('error',err);
        }
    }

    async getTemplateMessages(){
        try{
            this.socket.emit('template_messages_ok',['Hello','Hi there','How are you ','Bye!!']);
        }catch(err){
            console.log(err);
            this.socket.emit('error',err);
        }
    }

    async getRecentChats(numberOfChats){
        try{
            var chats = await chatModel.find({
                users:{$in:[new mongoose.Types.ObjectId(this.userId) ]},
            }).populate({path:'users',select:{first_name:1,last_name:1,profile_pic:1}}).sort({
                updatedAt:-1
            }).limit(numberOfChats);
            const chat = chats.map((c)=>{
                var lastActive = moment(c.lastActive).tz('Asia/Kolkata').calendar();
                return {...c.toObject(),lastActive:lastActive};
            });
            this.socket.emit('recentChats',chat); 
        }catch(err){
            console.log(err);
            this.socket.emit('error',err);
        }
    }

    async deleteMessage(messageId){
        try{
            await messageModel.findByIdAndUpdate(messageId,{isDeleted:true});
            this.socket.emit('delete-ok');
        }catch(err){
            console.log(err);
            this.socket.emit('error',err);
        }
    }

}

module.exports = User;