
import React from 'react';
import { browserHistory } from 'react-router';

export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  handleCloseClick = ev => {
    browserHistory.goBack();    
    ev.preventDefault();
  }

  render() {
    return (
      <div id="content-panel">
        <div id="content-panel-inner">
          <div className="header">
            <div className="content-panel-close">
              <a href="javascript:void(0);" onClick={this.handleCloseClick} title="close">X</a>
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

