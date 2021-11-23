const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const chatModel = require('./chatModel');
const chatController = require('./chatController');
const userModel = require('./userModel');

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
    console.log("database Connected")
        // var model = await chatModel.findById('6180dbb71bcaddff7e5c9c5b');
        // console.log(model);
});

io.use(chatController.authToken);

io.on('connection',(socket)=>{

    socket.on('connect',()=>{
        console.log('user connected');
    });

    socket.on('isOnline',(data)=>{

    });
    
    socket.on('typing',(senderId,recieverId)=>{
        
    });

    socket.on('message',(chatId,senderId,recieverId,message)=>{
        chatController.saveMessage(chatId,senderId,recieverId,message).then(()=>{
            socket.emit('message-ok',message);
        }).catch((err)=>{
            socket.emit('error',err);
        });
    });

    socket.on('delete',(messageId)=>{
        chatController.deleteMessage(messageId).then(()=>{
            socket.emit('delete-ok');
        }).catch((err)=>{
            socket.emit('error',err);
        });
    });

    socket.on('fetchMessages',async (chatId,skip)=>{
        try{
            const messages = await chatController.fetchMessages(chatId,skip);
            socket.emit('fetch-messages-ok',messages);
        }catch(err){
            socket.emit('error',err);
        }
    });

    socket.on('recentChats',async (userId,numberOfChats)=>{
        var chats = await chatModel.find({
            users:{$in:[new mongoose.Types.ObjectId(userId) ]},
        }).populate({path:'users',select:{first_name:1,last_name:1,profile_pic:1}}).sort({
            lastActive:-1
        }).limit(numberOfChats);
        socket.emit('recentChats',chats); 
    });

    socket.on('template_messages',()=>{
        socket.emit('template_messages_ok',['Hello','Hi there','How are you ','Bye!!']);
    });

    socket.on('fetch-user-details',(userId)=>{
        userModel.findById(userId,{profile_pic:1,first_name:1,last_name:1,}).then((user)=>{
            socket.emit('fetch-user-details-ok',user);
        }).catch((err)=>{
            socket.emit('error',err);
        });
    });

});

httpServer.listen(8000,()=>{
    console.log("server is running on 8000");
});