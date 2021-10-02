const {Server} = require('socket.io');

const io = Server();

io.on('connection',()=>{
    console.log("User Connected");
    io.on('message',(message,callback)=>{
        if(!message.user_id){
            callback("Invalid request");
        }else{

        }
    });

    io.on('typing',(message,callback)=>{
        if(message.contains){

        }
    });

    io.on('delete',(message_id,callback)=>{
        if(message.contains){
            
        }
    });
});