const jwt = require('jsonwebtoken');
const Narad = require('./narad');
const chatModel = require('../Models/chatModel');
const messageModel = require('../Models/messageModel');

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
                    await messageModel.create({
                        chatId:chatId,
                        message:message,
                        senderId:senderId,
                        recieverId:recieverId,
                    });
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
                        var time = moment(mes.createdAt).calendar();
                        this.socket.emit('message-ok',{...mes.toObject(),time:time});
                        Narad.getUser(recieverId)?.socket.emit('newMessage',{...mes.toObject(),time:time});
                    }else{
                        const newChat = await chatModel.create({
                            users:[senderId,recieverId],
                            lastMessage:message,
                        });
                        const mes = await messageModel.create({
                            chatId:newChat._id,
                            message:message,
                            senderId:senderId,
                            recieverId:recieverId,
                        });
                        var time = moment(mes.createdAt).calendar();
                        this.socket.emit('message-ok',{...mes.toObject(),time:time});
                        Narad.getUser(recieverId)?.socket.emit('newMessage',{...mes.toObject(),time:time});

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
            }).limit(20).skip(skip);
            const newMessages = messages.map((m)=>{
                m.time = moment(m.createdAt).calendar();
                return {...m.toObject(),time:m.time};
            });
            this.socket.emit('fetchMessages-ok',newMessages??[]);
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
                users:{$in:[new mongoose.Types.ObjectId(userId) ]},
            }).populate({path:'users',select:{first_name:1,last_name:1,profile_pic:1}}).sort({
                updatedAt:-1
            }).limit(numberOfChats);
            this.socket.emit('recentChats',chats); 
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