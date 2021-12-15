const jwt = require('jsonwebtoken');
const chatModel = require('./chatModel');
const messageModel = require('./messageModel');
const moment = require('moment');
function authToken(socket,next){
    try {
        const token  = socket.handshake.auth.token;
        const data = jwt.verify(token, 'SXYUASDSDETLVFRPDSEA');
        next();
    } catch (error) {
        console.log(error);
    }
}

async function saveMessage(chatId,senderId,recieverId,message){
    try {
        var mes;
        if(recieverId && senderId && message){
            if(chatId){
                const chat = await chatModel.findByIdAndUpdate(chatId,{
                    lastMessage: message,
                });
                mes = await messageModel.create({
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
                    mes = await messageModel.create({
                        chatId:chat[0]._id,
                        message:message,
                        senderId:senderId,
                        recieverId:recieverId,
                    });
                }else{
                    const newChat = await chatModel.create({
                        users:[senderId,recieverId],
                        lastMessage:message,
                    });
                    mes = await messageModel.create({
                        chatId:newChat._id,
                        message:message,
                        senderId:senderId,
                        recieverId:recieverId,
                    });
                }
            }
            return mes;
        }else{
            return 'validation failed';
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}
async function deleteMessage(messageId){
    try {
        if(messageId){
            const message = await messageModel.findByIdAndUpdate(messageId,{
                isDeleted:true,
            });
            return true;
        }
    } catch (error) {
        console.log(error);
    }
}
async function fetchMessages(chatId,skip){
    try {
        if(chatId){
            const messages = await messageModel.find({
                chatId:chatId,
            }).limit(20).skip(skip);
            const newMessages = messages.map((m)=>{
                // m.time = moment(m.createdAt).format('MMM Do YYYY h:mm A');
                m.time = moment(m.createdAt).calendar();
                return {...m.toObject(),time:m.time};
            });
            return newMessages??[];
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    authToken,
    saveMessage,
    deleteMessage,
    fetchMessages,
}