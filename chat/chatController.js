const jwt = require('jsonwebtoken');
const chatModel = require('./chatModel');

function authToken(socket,next){
    try {
        const token  = socket.handshake.auth.token;
        const data = jwt.verify(token, 'SXYUASDSDETLVFRPDSEA');
        next();
    } catch (error) {
        console.log(error);
    }
}

function addMessage(recieverId,senderId){
    try {
        
    } catch (error) {
        console.log(error);

    }
}

async function saveMessage(chatId,recieverId,senderId,message){
    try {
        if(recieverId && senderId && message){
            const chat = await chatModel.findById(chatId);
            if(chat){
                chat.lastMessage = message;
                chat.lastActive = Date.now();
                await chat.save();
                await messageModel.create({
                    chatId:chatId,
                    message:message,
                    senderId:senderId,
                    recieverId:recieverId,
                });
            }else{
                const newChat = await chatModel.create({
                    users:[senderId,recieverId],
                    lastMessage:'',
                });
                await messageModel.create({
                    chatId:newChat._id,
                    message:message,
                    senderId:senderId,
                    recieverId:recieverId,
                });
            }
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
async function fetchMessages(numberOfMessages,chatId){
    try {
        if(chatId){
            const messages = await messageModel.find({
                chatId:chatId,
                isDeleted:false,
            }).sort({createdAt:-1}).limit(numberOfMessages);
            return messages;
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    authToken,
    addMessage,
    saveMessage,
    deleteMessage,
    fetchMessages,
}