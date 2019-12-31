let allowSearch = true;

var searchYouTube = (options, callback) => {
  const {key, query, max} = options;
  const data = {q: query, key, maxResults: max, part: 'snippet'};

  if (allowSearch) {
    // allowSearch = false;
    // setTimeout(() => {
    //   allowSearch = true;
    //   searchYouTube(options, callback);
    // }, 5000);
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search',
      type: 'GET',
      data,
      contentType: 'application/json',
      success: callback,
      error: error => {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }
};

export default searchYouTube;
