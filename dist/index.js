import { v4 as uuidv4 } from 'uuid';
import { tweetsData } from './data/data.js';
document.addEventListener('click', function (e) {
    if (!e.target) {
        console.log('no target');
        return;
    }
    const target = e.target;
    if (target.dataset) {
        if (target.dataset.like) {
            handleLikeClick(target.dataset.like);
            return;
        }
        if (target.dataset.retweet) {
            handleRetweetClick(target.dataset.retweet);
            return;
        }
        if (target.dataset.reply) {
            handleReplyClick(target.dataset.reply);
            return;
        }
        if (target.id && target.id === 'tweet-btn') {
            handleTweetBtnClick();
        }
    }
});
function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter((tweet) => tweet.uuid === tweetId)[0];
    if (!targetTweetObj.isLiked) {
        targetTweetObj.likes++;
    }
    else {
        targetTweetObj.likes--;
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked;
    render();
}
function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter((tweet) => tweet.uuid === tweetId)[0];
    if (!targetTweetObj.isRetweeted) {
        targetTweetObj.retweets++;
    }
    else {
        targetTweetObj.retweets--;
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
    render();
}
function handleReplyClick(replyId) {
    document
        .querySelector(`#replies-${replyId}`)
        ?.classList.toggle('hidden');
}
function handleTweetBtnClick() {
    const tweetInput = document.querySelector('#tweet-input');
    if (tweetInput && tweetInput.value) {
        const newTweet = {
            handle: `@Whoever`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: `${tweetInput.value}`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: `${uuidv4()}`,
        };
        tweetsData.unshift(newTweet);
        tweetInput.value = '';
        render();
    }
}
function getFeedHtml() {
    let feedHtml = ``;
    tweetsData.forEach(function (tweet) {
        const likeIconClass = tweet.isLiked ? 'liked' : '';
        const retweetIconClass = tweet.isRetweeted ? 'retweeted' : '';
        let repliesHtml = '';
        if (tweet.replies.length > 0) {
            tweet.replies.forEach((reply) => {
                repliesHtml += `
            <div id="${tweet.uuid}" class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${reply.handle}</p>
                        <p class="tweet-text">${reply.tweetText}</p>
                    </div>
                </div>
            </div>`;
            });
        }
        feedHtml += `
    <div class="tweet">
    <div class="tweet-inner">
      <img src="${tweet.profilePic}" class="profile-pic">
      <div>
          <p class="handle">${tweet.handle}</p>
          <p class="tweet-text">${tweet.tweetText}</p>
          <div class="tweet-details">
              <span class="tweet-detail">
              <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                  ${tweet.replies.length}
              </span>
              <span class="tweet-detail">
              <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                  ${tweet.likes}
              </span>
              <span class="tweet-detail">
              <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                  ${tweet.retweets}
              </span>
          </div>   
      </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}" >
      ${repliesHtml}
    </div>
    </div>
    `;
    });
    return feedHtml;
}
function render() {
    const feedElement = document.querySelector('#feed');
    if (feedElement) {
        feedElement.innerHTML = getFeedHtml();
    }
}
render();
