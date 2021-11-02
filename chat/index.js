const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const chatModel = require('./chatModel');
const chatController = require('./chatController');

const httpServer = http.createServer();  
const io  = new socketio.Server(httpServer,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        transports : ["websocket"],
        credentials:true,
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
    // console.log("Connected")
        // var model = await chatModel.findById('6180dbb71bcaddff7e5c9c5b');
        // console.log(model);
});

io.use(chatController.authToken);

io.on('connection',(socket)=>{
    console.log("connected");   
    socket.on('typing',(senderId,recieverId)=>{

    });

    socket.on('message',(message,mode,senderId,recieverId)=>{

    });

    socket.on('delete',(senderId,recieverId)=>{

    });

    socket.on('fetchMessage',(numberOfMessage,senderId)=>{
        // chatModel.find({user:})  
        socket.emit('newMessages',[]);
    });
    
});

httpServer.listen(8000,()=>{
    console.log("server is running on 8000");
});