/* eslint-disable max-len */
/* !

=========================================================
* Argon React NodeJS - v1.0.0
=========================================================

* Product Page: https://argon-dashboard-react-nodejs.creative-tim.com/
* Copyright 2020 Creative Tim (https://https://www.creative-tim.com//)
* Copyright 2020 ProjectData (https://projectdata.dev/)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react-nodejs/blob/main/README.md)

* Coded by Creative Tim & ProjectData

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const compression = require('compression');
const https = require('https');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const db = require('./config/keys').mongoURI;
const CronJob = require('cron').CronJob;
const crons = require('./config/crons');

require('dotenv').config();

// Instantiate express
const app = express();
app.use(compression());

// Passport Config
require('./config/passport')(passport);

// DB Config

// Connect to MongoDB
mongoose
    .connect(
        db, {useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
          useCreateIndex: true},
    )
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

app.use(cors());



// Express body parser
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// REACT BUILD for production
if (process.env.NODE_ENV === 'PROD') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}


// Initialize routes middleware
app.use('/api/table', require('./routes/table'));
app.use('/api/users', require('./routes/users'));
app.use('/api/users', require('./routes/statusUpdate'));

// run at 3:10 AM -> delete old tokens
const tokensCleanUp = new CronJob('10 3 * * *', function() {
  crons.tokensCleanUp();
});
tokensCleanUp.start();

const PORT = process.env.PORT || 5100;


http.createServer({
}, app)
    .listen(PORT, function() {
      console.log('App listening on port ' + PORT + '! Go to http://localhost:' + PORT + '/');
    });



// FOR HTTPS ONLY
// https.createServer({
//   key: fs.readFileSync(process.env.SSLKEY),
//   cert: fs.readFileSync(process.env.SSLCERT),
// }, app)
//     .listen(PORT, function() {
//       console.log('App listening on port ' + PORT + '! Go to https://localhost:' + PORT + '/');
//     });
// app.use(requireHTTPS); FOR HTTPS
// app.enable('trust proxy');
// app.use(function(req, res, next) {
//   if (req.secure) {
//     return next();
//   }
//   res.redirect('https://' + req.headers.host + req.url);
// });

/**
 * @param {int} req req.
 * @param {int} res res.
 * @param {int} next next.
 * @return {void} none.
 */
function requireHTTPS(req, res, next) {
  if (!req.secure) {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

//socket.io
const Tail = require('tail').Tail;
const server = require('http').createServer(app)
const io = require('socket.io')(server,{
    cors : {
        origin :"*",
        credentials :true
    }
});

let interval;
let stopdoublecall= false;

io.on('connection', socket=>{
  // if(!stopdoublecall){
    // stopdoublecall=true
    if (interval) {
      clearInterval(interval);
    }
    console.log("New client connected");
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
      socket.disconnect();
    });
  // }
    // socket.on('message',({data}) => {
        // console.log(data);
        // io.emit('message',({data}));
        // let count = 0; // 초기 카운트 값 설정

        // setInterval(() => {
          // 
  
          // tail.on("line", function(data) {
          //   console.log(data);
          //   res.write(data);
            
          //   // console.log("hello");
          // });

          // tail.on("error", function(error) {
          //   console.log('ERROR: ', error);
          // });
          //   // count++;
          //   // data = data+count;
          //   console.log(data);
          //   io.emit('message',({data}));
        // }, 1000);
        // setInterval(() => io.emit('message',({data})), 2000);

        // }
    // })
})

const getApiAndEmit = socket => {
  // const response = new Date();
  // Emitting a new message. Will be consumed by the client

  // console.log(true)
  // tail = new Tail("./script_log.txt");
  // // console.log(tail)
  // tail.on("line", func      tion(data) {
  //   // console.log(true)
  //   console.log(data)
  // });
  // tail.on("error", function(error) {
  //   console.log('ERROR: ', error);
  // });
  console.log("sending")
  socket.emit("message", "datadfsdfasdf");
};

server.listen(4000, function(){
    console.log('listening on port 4000 for tcp');
})