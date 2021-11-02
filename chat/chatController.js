const jwt = require('jsonwebtoken');

function authToken(socket,next){
    try {
        const token  = socket.handshake.auth.token;
        console.log(token);
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

module.exports ={
    authToken,
    addMessage
}