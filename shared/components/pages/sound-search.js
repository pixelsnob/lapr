
import React from 'react';
import { browserHistory } from 'react-router';
import Products from '../products';
import TagsNav from '../navs/tags';
import SortDirection from '../sort_direction';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected_tag_ids: new Set,
      sort_direction:   1
    };
  }

  componentWillMount() {
    this.tagSlugsToIds(this.props.params.tags);
  }
  
  componentWillReceiveProps(props) {
    this.tagSlugsToIds(props.params.tags);
  }

  handleSortDirectionChange = () => {
    this.setState({ sort_direction: -this.state.sort_direction });
  }

  sort(products) {
    return products.slice().sort((a, b) => {
      var comp = a.name.localeCompare(b.name);
      return (this.state.sort_direction == -1 ? -comp : comp);
    });
  }

  tagSlugsToIds(slugs) {
    if (!slugs) {
      return this.setState({ selected_tag_ids: new Set });
    }
    var selected_tag_ids = slugs.split(',')
      .map(slug => this.props.data.tags.find(tag => tag.slug == slug))
      .filter(tag => tag)
      .map(tag => tag._id);
    this.setState({ selected_tag_ids: new Set(selected_tag_ids) });
  }

  handleTagsReset = () => {
    this.setState({ selected_tag_ids: new Set });
    browserHistory.push('/instruments/tags');
  }
  
  filterBySelectedTags(products) {
    return products.filter(product => 
      Array.from(this.state.selected_tag_ids).every(selected_tag_id =>
        product.tags.find(product_tag_id =>
          selected_tag_id == product_tag_id
        )
      )
    );
  }
  
  getFilteredTags(filtered_products) {
    var product_tags = new Set;
    filtered_products.forEach(product => {
      product.tags.forEach(tag => {
        product_tags.add(tag);
      });
    });
    var filtered_tags = [];
    if (product_tags.size) {
      filtered_tags = this.props.data.tags.filter(tag => 
        Array.from(product_tags).some(curr => curr == tag._id)
      );
    }
    return filtered_tags; 
  }

  render() {
    var products = this.props.data.products.filter(product => product.tags.length);
    if (this.state.selected_tag_ids.size) {
      products = this.filterBySelectedTags(products);
    }
    products = this.sort(products);
    if (!this.props.content_panel && typeof window != 'undefined') {
      window.scroll(0, 0);
    }
    return (
      <div className="container-fluid products products-tags-search">
        <div className="row">
          <div className="sidebar col-xs-6 col-sm-6 col-md-3">
            <nav>
              <div className="tags-tree">
                <TagsNav
                  selected_tag_ids={this.state.selected_tag_ids}
                  onReset={this.handleTagsReset}
                  {...this.props}
                />
              </div>
            </nav>
          </div>
          <div className="products-results col-xs-6 col-sm-6 col-md-9">
            <div id="heading-container">
              <h2 className="line-after">Sound Search</h2>
              <div className="stats-container">
                <div className="stats secondary">
                  {products.length} Result{products.length == 1 ? '' : 's'}
                </div>
                <div className="sort-direction hidden-xs hidden-sm">
                  <SortDirection
                    sort_direction={this.state.sort_direction}
                    onChange={this.handleSortDirectionChange}
                  />
                </div>
              </div>
            </div>
            <div className="boxes-list">
              <Products products={products} sort_direction={this.state.sort_direction}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

