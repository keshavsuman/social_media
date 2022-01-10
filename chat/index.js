const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userModel = require('./Models/userModel');
const User = require('./Classes/user');
const Narad = require('./Classes/narad');
const httpServer = http.createServer();  



const io  = new socketio.Server(httpServer,{
        cors: {
        origin: "*",
        methods: ["GET", "POST"],
        transports : ["websocket"],
        // credentials:true,
      }
});
const uri = 'mongodb://younity:younity123@13.127.217.154:27017/social-media?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify:false
    // reconnectTries: 60,
    // reconnectInterval: 2000,
  });
  
mongoose.connection.on('error', (err) => console.log(err))
mongoose.connection.on('open', async () =>{
    // console.log("database Connected")
});

io.use(auth);

io.on('connection',(socket)=>{
    const user = new User(socket);
    Narad.add(user);

    socket.on('isOnline',(userId)=>user.isOnline(userId)); 
    
    socket.on('typing',(senderId,recieverId)=>{});
    
    socket.on('message',(chatId,senderId,recieverId,message)=>{user.sendMessage(chatId,senderId,recieverId,message);});
   
    socket.on('delete',(messageId)=>{user.deleteMessage(messageId);});

    socket.on('fetchMessages',(chatId,skip)=>{user.getMessages(chatId,skip);});

    socket.on('recentChats',(numberOfChats)=>{user.getRecentChats(numberOfChats);});

    socket.on('template_messages',()=>{user.getTemplateMessages();});

    socket.on('fetch-user-details',(userId)=>{
        userModel.findById(userId,{profile_pic:1,first_name:1,last_name:1,}).then((user)=>{
            socket.emit('fetch-user-details-ok',user);
        }).catch((err)=>{
            socket.emit('error',err);
        });
    });

    socket.on('disconnect',()=>{
        Narad.remove(user);
        console.log('user disconnected');
    });
});

httpServer.listen(8000,()=>{
    console.log("server is running on 8000");
});

function auth(socket,next){
    try {
        const token  = socket.handshake.auth.token;
        jwt.verify(token, 'SXYUASDSDETLVFRPDSEA');
        next();
    } catch (error) {
        console.log(error);
        socket.emit('error',error);
    }
}
