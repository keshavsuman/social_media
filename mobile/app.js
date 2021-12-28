const express = require('express');
const app = express();
const http = require('http');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');
// const compression = require('compression');
const { errors } = require('celebrate');
const cors = require('cors')

const config = require('./config/config');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');

const PORT = config.port;
var uri ;
// const uri = `mongodb://${db[config.environment].host}:${db[config.environment].port}/${db[config.environment].database}?authSource=admin&w=1`
if(config.environment=='development')
{
   uri=`mongodb://younity:younity123@13.127.217.154:27017/social-media?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
  //  uri = `mongodb://${db[config.environment].host}/${db[config.environment].database}`;
}else{
   uri = `mongodb+srv://${db[config.environment].user}:${db[config.environment].password}@${db[config.environment].host}/${db[config.environment].database}?retryWrites=true&w=majority`
}
// mongoose.connect(uri, {
//   // auth: {
//   //   user: db[config.environment].user,
//   //   password: db[config.environment].password
//   // },
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// })
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//   })
//   .catch(err => {
//     console.error("Connection error", err);
//   });



mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
  // reconnectTries: 60,
  // reconnectInterval: 2000,
});

mongoose.connection.on('error', (err) => console.log(err))
mongoose.connection.on('open', () => console.log("Connected"))



app.use(helmet());
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
// To remove data, which leads to nosql injection:
app.use(mongoSanitize({
  onSanitize: ({ req, key }) => {
    console.warn(`This request[${key}] is sanitized`, req);
  },
}));
// app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: 'false' }));
app.use(express.json());
app.use(require('./routes'));
app.use(errors());
app.use('/uploads',express.static(path.join(__dirname+'/../uploads')));


// app.use(/^((?!(api)).)*/, (req, res) => {
//   if (req.method === 'GET') {
//     res.sendFile(path.join(__dirname, '../users/build/index.html'))
//   } else {
//     res.status(500).json({
//       message: req.method + ' not Allowed'
//     })
//   }
// })

// app.use(/^((?!(api))\/admin.)*/, (req, res) => {
//   if (req.method === 'GET') {
//     res.sendFile(path.join(__dirname, '../admin/build/index.html'))
//   } else {
//     res.status(500).json({
//       message: req.method + ' not Allowed'
//     })
//   }
// })

const httpServer = http.createServer(app);
httpServer.listen(PORT, (err) => {
  console.log('http server running on port ' + PORT)
})
