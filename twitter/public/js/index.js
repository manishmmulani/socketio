"use strict";

(function() {

  window.twitterApp = {
    initialize : _initialize
  };

  let socket = io("http://localhost:4000");
  const tweetContainer = document.getElementById("tweet-container");
  const tweetListElement = document.querySelector("#tweet-container ul");

  function _initialize() {
    _registerOnTweetHandler();
  }

  function _registerOnTweetHandler() {
    socket.on("tweet", function(tweet) {
      if (!tweet.retweet_status && tweet.user.followers_count > 5000) {
        console.log(`Received tweet : ${JSON.stringify(tweet)}`);

        // let listElement = document.createElement("li");
        // listElement.innerHTML = tweet.text;
        // tweetListElement.appendChild(listElement);
        tweetContainer.appendChild(_getTweetHTML(tweet));
      }
    });
  }

  function _getTweetHTML(tweet) {
    let tweetTemplate = document.getElementById("tweetTemplate");
    let tweetElementClone = document.importNode(tweetTemplate.content, true);

    tweetElementClone.getElementById("tweetText").innerHTML = tweet.text;
    tweetElementClone.getElementById("author").innerHTML = `${tweet.user.name} @${tweet.user.screen_name}`;
    tweetElementClone.getElementById("tweetLink").href = "";
    tweetElementClone.getElementById("tweetDate").innerHTML = tweet.created_at;

    return tweetElementClone;
  }
})();