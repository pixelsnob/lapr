
import React from 'react';
import { Link } from 'react-router';

export default class extends React.Component {

  constructor(props) {
    super(props);
  }

  getLinkSlugs() {
    // Work with a copy of selected_tag_ids
    var selected_tag_ids = new Set(this.props.selected_tag_ids);
    if (selected_tag_ids.has(this.props.tag._id)) {
      selected_tag_ids.delete(this.props.tag._id);
    } else {
      selected_tag_ids.add(this.props.tag._id);
    }
    return Array.from(selected_tag_ids).map(selected_tag_id =>
      this.props.data.tags.find(tag => selected_tag_id == tag._id)
    ).map(tag => tag.slug).join(',');
  }
  
  isSelected() {
    return Array.from(this.props.selected_tag_ids).includes(this.props.tag._id);
  }

  render() {
    var class_names = [];
    if (this.isSelected()) {
      class_names.push('selected');
    }

    return (
      <li className={class_names.join(' ')}>
        <Link to={"/instruments/tags/" + this.getLinkSlugs()}>
          {this.props.tag.name}
        </Link>
      </li>
    );
  }
}

