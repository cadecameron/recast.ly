import searchYouTube from '../lib/searchYouTube.js';
import YOUTUBE_API_KEY from '../config/youtube.js';

var Search = ({ callback, max = 5 }) => {

  var onChangeHandler = (e) => {
    var options = {
      key: YOUTUBE_API_KEY,
      query: e.target.value,
      max: max
    };
    searchYouTube(options, callback);
  };


  return (
    <div className="search-bar form-inline">
      <input onChange={onChangeHandler} className="form-control" type="text" />
      <button className="btn hidden-sm-down">
        <span className="glyphicon glyphicon-search"></span>
      </button>
    </div>
  );
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default Search;
