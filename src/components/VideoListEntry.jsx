var VideoListEntry = ({ video, callback }) => {

  var titleClickHandler = () => {
    // invoke callback function to update App state
    callback(video);
  };

  return (
    <div className="video-list-entry media">
      <div className="media-left media-middle">
        <img className="media-object" src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
      </div>
      <div className="media-body">
        <div onClick={titleClickHandler} className="video-list-entry-title">{video.snippet.title}</div>
        <div className="video-list-entry-detail">{video.snippet.description}</div>
      </div>
    </div>
  );
};

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoListEntry.propTypes = {
  video: React.PropTypes.object.isRequired
};

export default VideoListEntry;
