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
      nextPageToken: '',
      previousPageToken: ''
    };
  }

  componentDidMount() {
    this.props.searchYouTube({}, this.updateSearch.bind(this));
  }

  changeCurrentVideo (video) {
    this.setState({
      currentVideo: video
    });
  }

  updateSearch (videos) {
    this.setState({
      currentVideo: videos[0],
    });
    this.updateVideos(videos);
  }

  updateVideos (videos) {
    this.setState({
      videos: videos
    });
  }

  render() {

    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search callback={this.updateSearch.bind(this)}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            {this.state.currentVideo ? <VideoPlayer video={this.state.currentVideo} /> : <div className='video-player' />}
          </div>
          <div className="col-md-5">
            {this.state.videos ? <VideoList videos={this.state.videos} callback={this.changeCurrentVideo.bind(this)} /> : <div className='video-list' />}
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
