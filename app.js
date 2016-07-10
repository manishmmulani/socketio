/*jshint node:true*/
"use strict";

const path = require("path");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

//console.log(process.env);

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

let userConnectionSockets = [];

io.on("connection", function(socket) {
  userConnectionSockets.push(socket);

  _registerSocketListeners(socket);

  console.log(`New user connected. Total number of connections - ${userConnectionSockets.length}`);

});

function _registerSocketListeners(socket) {
  socket.on("disconnect", function() {
    let index = userConnectionSockets.indexOf(socket);
    userConnectionSockets.splice(index, 1);

    console.log(`User disconnected. Number of connections - ${userConnectionSockets.length}`);
  });

  socket.on("sendChat", function(msg) {
    console.log(`Received message ${msg}`);
    userConnectionSockets.forEach(userConnectionSocket => {
      userConnectionSocket.emit("newMessage", msg);
    });

    io.emit("newMessage", "Message to All including current socket");
    socket.broadcast.emit("newMessage", "Message to All but my connecting socket");
  });
}






http.listen(3000, function() {
  console.log("Server started!!!");
});

