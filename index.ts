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
  console.log(target);
  if (target.dataset && target.dataset.like) {
    console.log(target.dataset.like);
    handleLikeClick(target.dataset.like);
  }
});

function handleLikeClick(tweetId: string) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];

  targetTweetObj.likes++;
  console.log(targetTweetObj);
}

function getFeedHtml() {
  let feedHtml = ``;

  tweetsData.forEach(function (tweet) {
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
              <i class="fa-solid fa-heart" data-like="${tweet.uuid}""></i>
                  ${tweet.likes}
              </span>
              <span class="tweet-detail">
              <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}""></i>
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
