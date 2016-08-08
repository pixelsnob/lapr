
import React from 'react';
import YoutubePlayer from 'react-youtube';

export default class extends React.Component {
  
  constructor(props) {
    super(props);
    this.yt_params = {
      autoplay:        0,
      enablejsapi:     1,
      html5:           1,
      autohide:        1,
      modestbranding:  1,
      showinfo:        0,
      controls:        1,
      disablekb:       0
    };
  }
  
  onClick = (ev) => {
    this.props.onClick(this.props.video);
    ev.preventDefault();
  }

  render() {
    
    return (
      <li>
        <a href={"//www.youtube.com/watch?v=" + this.props.video.youtube_id} onClick={this.onClick}>
          <img src={"//img.youtube.com/vi/" + this.props.video.youtube_id + "/mqdefault.jpg"} height="45"/>
        </a>
        <div className="title">
          {this.props.video.description}
        </div>
      </li>
    );

  }
}


