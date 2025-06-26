import { tweetsData } from './data/data.js';

const tweetInput =
  document.querySelector<HTMLInputElement>('#tweet-input');
const tweetBtn = document.querySelector<HTMLElement>('#tweet-btn');

if (tweetBtn) {
  tweetBtn.addEventListener('click', () => {
    if (tweetInput && tweetInput.value) {
      console.log(tweetInput.value);
      tweetInput.value = '';
    }
  });
}

document.addEventListener('click', function (e) {
  if (!e.target) {
    console.log('no target');
    return;
  }
  const target = e.target as HTMLElement;

  if (target.dataset) {
    if (target.dataset.like) {
      handleLikeClick(target.dataset.like);
      return;
    }

    if (target.dataset.retweet) {
      handleRetweetClick(target.dataset.retweet);
      return;
    }
  }
});

function handleLikeClick(tweetId: string) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];

  if (!targetTweetObj.isLiked) {
    targetTweetObj.likes++;
  } else {
    targetTweetObj.likes--;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;
  render();
}

function handleRetweetClick(tweetId: string) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];

  if (!targetTweetObj.isRetweeted) {
    targetTweetObj.retweets++;
  } else {
    targetTweetObj.retweets--;
  }

  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  render();
}

function getFeedHtml() {
  let feedHtml = ``;

  tweetsData.forEach(function (tweet) {
    let likeIconClass = '';
    let retweetIconClass = '';

    if (tweet.isLiked) {
      likeIconClass = 'liked';
    }
    if (tweet.isRetweeted) {
      retweetIconClass = 'retweeted';
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
    </div>
    `;
  });
  return feedHtml;
}

function render() {
  const feedElement = document.querySelector<HTMLElement>('#feed');
  if (feedElement) {
    feedElement.innerHTML = getFeedHtml();
  }
}

render();
