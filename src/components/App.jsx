import Search from './Search.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: null,
      currentVideo: null,
      // state to be used for pagination:
      nextPageToken: '',
      previousPageToken: ''
    };
  }

  componentDidMount() {
    this.props.searchYouTube({}, this.updateResults.bind(this));
  }

  // update currentVideo state
  changeCurrentVideo(video) {
    this.setState({
      currentVideo: video
    });
  }

  // update the video list AND current video states
  updateSearch(videos) {
    this.setState({
      currentVideo: videos[0],
    });
    this.updateVideos(videos);
  }

  // update video list state
  updateVideos(videos) {
    this.setState({
      videos: videos
    });
  }

  // update page tokens, and pass API data to updateSearch
  updateResults(response) {
    this.updateSearch(response.items);
    this.setState({
      nextPageToken: response.nextPageToken || '',
      previousPageToken: response.prevPageToken || ''
    });
  }

  updatePageTokens(next, prev) {
    this.setState({
      nextPageToken: next || '',
      previousPageToken: prev || ''
    });
  }

  changeVideoListPage(next) {
    var token = next ? this.state.nextPageToken : this.state.prevPageToken;
    this.props.searchYouTube({ pageToken: token }, results => {
      this.updateVideos.call(this, results.items);
      this.updatePageTokens.call(this, results.nextPageToken, results.prevPageToken);
    });
  }

  render() {

    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search callback={this.updateSearch.bind(this)} />
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            {this.state.currentVideo ? <VideoPlayer video={this.state.currentVideo} /> : <div className='video-player' />}
          </div>
          <div className="col-md-5">
            {this.state.videos ? <VideoList videos={this.state.videos} callback={this.changeCurrentVideo.bind(this)} changeVideoListPage={this.changeVideoListPage.bind(this)} /> : <div className='video-list' />}
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
