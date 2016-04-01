
import React from 'react';
import { Link } from 'react-router';

export default class extends React.Component {

  constructor(props) {
    super(props);
  }

  getLinkSlugs() {
    var selected_tag_ids = new Set(this.props.selected_tag_ids);
    if (selected_tag_ids.has(this.props.tag._id)) {
      selected_tag_ids.delete(this.props.tag._id);
    } else {
      selected_tag_ids.add(this.props.tag._id);
    }
    return Array.from(selected_tag_ids).map(selected_tag_id =>
      this.props.tags.find(tag => selected_tag_id == tag._id)
    ).map(tag => tag.slug).join(',');
  }

  render() {
    return (
      <li>
        <Link to={"/instruments/tags/" + this.getLinkSlugs()}>
          {this.props.tag.name}
        </Link>
      </li>
    );
  }
}

