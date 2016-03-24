
import React from 'react';

export default class extends React.Component{
  
  handleClick(ev) {
    this.props.onChange();
  }

  render() {
    return (
      <div id="sort-direction">
        <a href="javascript:void(0);" onClick={this.handleClick.bind(this)}>Sort</a>
        <div>{(this.props.sort_direction == 1 ? 'Asc' : 'Desc')}</div>
      </div>
    );
  }
}


