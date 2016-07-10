/*jshint node:true*/
"use strict";

require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const TWITTER = require("node-tweet-stream");
const twitterConfig = require("./config.js");

_trackTweets();

app.use(express.static(path.join(__dirname, 'public')));

let connections = [];

io.on("connection", function(socket) {
  connections.push(socket);

  _registerSocketListeners(socket);

  console.log(`Total number of connections : ${connections.length}`);
});

function _registerSocketListeners(socket) {
  socket.on("disconnect", function() {
    console.log(`User disconnected. Remaining connections ${connections.length}`);

    let socketIndex = connections.indexOf(socket);

    connections.splice(socketIndex, 1);
  });
}

function _trackTweets() {
  const twitterStream = TWITTER(twitterConfig);
  twitterStream.track("modi");
  twitterStream.track("cricket");
  twitterStream.track("nodejs");

  twitterStream.on("tweet", function(tweet) {
    io.emit("tweet", tweet);
  });
}

http.listen(process.env.TWITTER_PORT || 4000, function() {
  console.log("Twitter Streaming app started!!!");
});
