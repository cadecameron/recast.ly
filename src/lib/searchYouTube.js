// TODO: Implement debouce
// Docs: https://lodash.com/docs/4.17.15#debounce

var searchYouTube = (options, callback) => {
  const { key, query, max } = options;
  const data = {
    q: query, key, maxResults: max, part: 'snippet', type: 'video', videoEmbeddable: 'true'
  };

  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    type: 'GET',
    data,
    contentType: 'application/json',
    success: results => {
      const videos = results.items;
      callback(videos);
    },
    error: error => {
      console.error('Failed to fetch videos', error.responseText);
    }
  });
};

export default searchYouTube;
