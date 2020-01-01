import YOUTUBE_API_KEY from '../config/youtube.js';

var searchYouTube = _.debounce(
  (options, callback) => {
    const { key = YOUTUBE_API_KEY, query = '', max = 5, pageToken = '' } = options;
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
      .then(response => response.json())
      .then(data => {
        callback(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, 1000, {'leading': false, 'trailing': true}
);

export default searchYouTube;