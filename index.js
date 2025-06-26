"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_js_1 = require("./data/data.js");
var tweetInput = document.querySelector('#tweet-input');
var tweetBtn = document.querySelector('#tweet-btn');
if (tweetBtn) {
    tweetBtn.addEventListener('click', function () {
        if (tweetInput && tweetInput.value) {
            console.log(tweetInput.value);
            tweetInput.value = '';
        }
    });
}
document.addEventListener('click', function (e) {
    if (!e.target)
        return;
    var target = e.target;
    if (target.dataset && target.dataset.like) {
        console.log(target.dataset.like);
        handleLikeClick(target.dataset.like);
    }
});
function handleLikeClick(tweetId) {
    console.log(tweetId);
}
function getFeedHtml() {
    var feedHtml = "";
    data_js_1.tweetsData.forEach(function (tweet) {
        feedHtml += "\n    <div class=\"tweet\">\n    <div class=\"tweet-inner\">\n      <img src=\"".concat(tweet.profilePic, "\" class=\"profile-pic\">\n      <div>\n          <p class=\"handle\">").concat(tweet.handle, "</p>\n          <p class=\"tweet-text\">").concat(tweet.tweetText, "</p>\n          <div class=\"tweet-details\">\n              <span class=\"tweet-detail\">\n              <i class=\"fa-regular fa-comment-dots\"></i>\n                  ").concat(tweet.replies.length, "\n              </span>\n              <span class=\"tweet-detail\">\n              <i class=\"fa-solid fa-heart\"></i>\n                  ").concat(tweet.likes, "\n              </span>\n              <span class=\"tweet-detail\">\n              <i class=\"fa-solid fa-retweet\"></i>\n                  ").concat(tweet.retweets, "\n              </span>\n          </div>   \n      </div>            \n    </div>\n    </div>\n    ");
    });
    return feedHtml;
}
function render() {
    var feedElement = document.querySelector('#feed');
    if (feedElement) {
        feedElement.innerHTML = getFeedHtml();
    }
}
render();
