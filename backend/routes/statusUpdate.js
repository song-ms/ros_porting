const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const User = require('../models/user');
const ActiveSession = require('../models/activeSession');
const reqAuth = require('../config/safeRoutes').reqAuth;
const {smtpConf} = require('../config/config');
const path = require("path");
const shell = require('shelljs')

var net = require('net'),
    sockets = [];
 
var server = net.createServer(function (client) {
    client.setEncoding('utf8');
    client.setTimeout(500);
    client.on('data', function (data) {
        for (var i = 0; i < sockets.length; i++) {
            sockets[i].write(data);
        }
    });
    client.on('error', function () {
        //console.log(`error`);
    });
    client.on('close', function () {
        sockets.pop();
        console.log(' close ㅂㅂ');
    });
    client.on('timeout', function () {});
    client.write('hihi');
    sockets.push(client);
});
 
server.on('error', function (error) {
 
});
server.listen(2222, function () {
 
    var serverInfo = server.address();
    var serverInfoJson = JSON.stringify(serverInfo);
    console.log('listen server : ' + serverInfoJson);
    server.on('close', function () {
        console.log('server closed.');
    });
    server.on('connection', function () {
        console.log(`누가드르와따`);
    });
});



module.exports = router;