"use strict";

(function() {

  window.twitterApp = {
    initialize : _initialize
  };

  let socket = io("http://localhost:4000");

  function _initialize() {
    _registerOnTweetHandler();
  }

  function _registerOnTweetHandler() {
    socket.on("tweet", function(tweet) {
      console.log(`Received tweet : ${JSON.stringify(tweet)}`);
    });
  }

})();