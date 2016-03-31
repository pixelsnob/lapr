
import React from 'react';
import Tags from './tags';

export default class extends React.Component {

  render() {
    return (
      <ul id="tags">
        <li>
          <a href="javascript:void(0);" onClick={this.props.onReset}>[ Reset ]</a>
        </li>
        {this.props.tags.map(tag =>
          <TagComponent
            tag={tag}
            key={tag._id}
            {...this.props}
          />
        )}
      </ul>
    );
  }
}

