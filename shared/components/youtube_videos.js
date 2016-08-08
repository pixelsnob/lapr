
import React from 'react';
import YoutubeVideo from './youtube_video';
import ReactYoutube from 'react-youtube';

export default class extends React.Component {
  
  constructor(props) {
    super(props);
    this.video_opts = {
      playerVars: {
        autoplay:        1,
        enablejsapi:     1,
        html5:           1,
        autohide:        1,
        modestbranding:  1,
        showinfo:        0,
        controls:        1,
        disablekb:       0
      }
    };
    this.state = { video_id: null };
  }
  
  play = (video) => {
    this.setState({ video_id: video.youtube_id });
  }

  render() {
    if (!Array.isArray(this.props.youtube_videos) || !this.props.youtube_videos.length) {
      return null;
    }
    let player = null;
    if (this.state.video_id) {
      player = <ReactYoutube videoId={this.state.video_id} opts={this.video_opts}/>; 
    }
    return (
      <div>
        <ul className="youtube-videos">
          {this.props.youtube_videos.map(video => 
            <YoutubeVideo video={video} key={video._id} onClick={this.play}/>
          )}
        </ul>
        {player}
      </div>
    );

  }
}


