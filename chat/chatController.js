const jwt = require('jsonwebtoken');

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

        if(chatId && recieverId && senderId && message){
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
                // newChat._id
            }
        }else{
            console.log(error);
            return error;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports ={
    authToken,
    addMessage,
    saveMessage
}