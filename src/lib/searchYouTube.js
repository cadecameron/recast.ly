// TODO: Implement debouce
// Docs: https://lodash.com/docs/4.17.15#debounce
import YOUTUBE_API_KEY from '../config/youtube.js';

var searchYouTube = (options, callback) => {
  const { key = YOUTUBE_API_KEY, query = '', max = 5, pageToken = '' } = options;
  console.log(key);
  const data = {
    q: query,
    key,
    maxResults: max,
    part: 'snippet',
    type: 'video',
    videoEmbeddable: 'true',
    pageToken: pageToken,
  };

  // Make https url string
  // If page token, ignore query, if no page token ignore page token
  var getString = data.pageToken === '' ?
    `https://www.googleapis.com/youtube/v3/search?key=${data.key}&q=${data.q}&maxResults=${data.maxResults}&part=${data.part}&type=${data.type}&videoEmbeddable=${data.videoEmbeddable}` :
    `https://www.googleapis.com/youtube/v3/search?key=${data.key}&pageToken=${data.pageToken}&maxResults=${data.maxResults}&part=${data.part}&type=${data.type}&videoEmbeddable=${data.videoEmbeddable}`;

  fetch(getString)
    .then(response => {
      // Throw error if response.ok === false
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      callback(data.items);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });

  // $.ajax({
  //   url: 'https://www.googleapis.com/youtube/v3/search',
  //   type: 'GET',
  //   data,
  //   contentType: 'application/json',
  //   success: results => {
  //     const videos = results.items;
  //     callback(videos);
  //   },
  //   error: error => {
  //     console.error('Failed to fetch videos', error.responseText);
  //   }
  // });
};

export default searchYouTube;
