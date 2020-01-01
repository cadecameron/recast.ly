import VideoListEntry from './VideoListEntry.js';

var VideoList = ({ videos, callback, changeVideoListPage }) => (
  <div className="video-list">
    {videos.map((video, i) => <VideoListEntry key={i} video={video} callback={callback} />)}
    <div>
      <button className="btn hidden-sm-down" onClick={() => changeVideoListPage(false)}>
        <span className="glyphicon glyphicon-chevron-left"></span>
      </button>
      <button className="btn hidden-sm-down" onClick={() => changeVideoListPage(true)}>
        <span className="glyphicon glyphicon-chevron-right"></span>
      </button>
    </div>
  </div >
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoList.propTypes = {
  videos: React.PropTypes.array.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
export default VideoList;
