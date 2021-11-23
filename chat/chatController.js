const jwt = require('jsonwebtoken');
const chatModel = require('./chatModel');
const messageModel = require('./messageModel');

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
            const chat = await chatModel.findById(chatId);
            if(chat){
                chat.lastMessage = message;
                chat.lastActive = Date.now();
                await chat.save();
                mes = await messageModel.create({
                    chatId:chatId,
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
            return messages;
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