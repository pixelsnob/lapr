
import React from 'react';
import TagCategory from './tag_category';

export default class extends React.Component {

  render() {
    return (
      <div className="tags-nav">
        <ul>
          {this.props.tag_categories.map(tag_category =>
            <TagCategory
              tag_category={tag_category}
              key={tag_category._id}
              {...this.props}
            />
          )}
        </ul>
        <div className="tag">
          <a href="javascript:void(0);" onClick={this.props.onReset}
           className="alert reset">Reset</a>
        </div>
      </div>
    );
  }
}

