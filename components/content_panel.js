
import React from 'react';

export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    //console.log(this.props.content);
    return (
      <div id="content-panel">
        <div id="content-panel-inner">
          <div className="header">
            <div className="content-panel-close">
              
            </div>
          </div>
          <div className="content">
            {this.props.content}

          </div>
        </div>
      </div>
    );
  }
}

