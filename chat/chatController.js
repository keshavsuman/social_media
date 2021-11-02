export function authToken(socket,next){
    try {
        const token  = socket.handshake.auth.token;
        const data = jwt.verify(token, 'SXYUASDSDETLVFRPDSEA');
        next();
    } catch (error) {
        console.log(error);
    }
}

export function addMessage(recieverId,senderId){
    try {
        
    } catch (error) {
        console.log(error);

    }
}