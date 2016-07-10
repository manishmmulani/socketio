"use strict";

(function() {
  window.socketApp = {
    initialize : _initialize
  };

  let SOCKET = null;

  function _initialize() {
    SOCKET = io();
    _registerButtonClick();
    _registerOnNewMessage();
  }

  function _registerButtonClick() {
    let submitBtn = document.getElementById("submit");

    submitBtn.onclick = function() {
      let messageInput = document.getElementById("message");
      SOCKET.emit("sendChat", messageInput.value);
      messageInput.value = "";
    };
  }

  function _registerOnNewMessage() {
    SOCKET.on("newMessage", function(msg) {
      console.log(`New message received ${msg}`);
    })
  }
})();