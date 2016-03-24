
import React from 'react';

export default class extends React.Component {

  handleClick = (ev) => {
    this.props.onTagSelect(this.props.tag);
    ev.preventDefault();
    return false;
  }

  render() {
    var style = {};
    if (this.props.selected_tag_ids.indexOf(this.props.tag._id) != -1) {
      style = { color: 'red' };
    } else {
      style = {};
    }
    return (
      <li>
        <a href="javascript:void(0);" onClick={this.handleClick} style={style}>
          {this.props.tag.name}
        </a>
      </li>
    );
  }
}


