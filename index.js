import { tweetsData } from './data/data.js';

const tweetInput = document.getElementById('tweet-input');
const tweetBtn = document.getElementById('tweet-btn');

tweetBtn.addEventListener('click', () => {
  console.log(tweetInput.value);
  tweetInput.value = '';
});
