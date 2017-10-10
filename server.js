// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.get('/',function (req, res) {
  // body...
  res.sendFile(__dirname + '/index.html');
});

// Chatroom

var numUsers = 0;
var connections= [];


io.on('connection', function (socket) {
  connections.push(socket);
  console.log("connected: %s socket connected", connections.length);
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('send message', function (data) {
    console.log(data);
    // we tell the client to execute 'new message'
    io.sockets.emit('new message', {msg:data});
  });


  // when the user disconnects.. perform this
  socket.on('disconnect', function (data) {
    connections.splice(connections.indexOf(socket),1);
     console.log("Disconnected: %s socket connected", connections.length);
  });
});