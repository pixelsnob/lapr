
import React from 'react';
import Tag from './tag';

export default class extends React.Component {

  render() {
    var category_tags = this.props.tags.filter(tag =>
      tag.category == this.props.tag_category._id
    );
    if (category_tags) {
      var tags = <ul className="tags-list">
        {category_tags.map(tag =>
          <Tag tag={tag} key={tag._id} {...this.props}/>
        )}
      </ul>;
    }
    return (
      <li>
        {this.props.tag_category.name}
        {tags || ''}
      </li>
    );
  }
}


