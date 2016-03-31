
import React from 'react';
import Products from '../products';
import Tags from '../navs/tags';
import SortDirection from '../sort_direction';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected_tag_ids: [],
      sort_direction:   1
    };
  }

  componentWillMount() {
  }
  
  componentWillReceiveProps(props) {
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

  handleTagSelect = tag => {
    var selected_tag_ids = this.state.selected_tag_ids.slice();
    var i = selected_tag_ids.indexOf(tag._id);
    if (i == -1) {
      selected_tag_ids.push(tag._id);
    } else {
      selected_tag_ids.splice(i, 1);
    }
    this.setState({ selected_tag_ids });
  }
  
  handleTagsReset = () => {
    this.setState({ selected_tag_ids: [] });
  }

  filterBySelectedTags(products) {
    var selected_tag_ids = this.state.selected_tag_ids;
    if (!selected_tag_ids.length) {
      return products;
    }
    return products.filter(product => 
      selected_tag_ids.every(selected_tag_id =>
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
      filtered_tags = this.props.tags.filter(tag => 
        Array.from(product_tags).some(curr => curr == tag._id)
      );
    }
    return filtered_tags; 
  }

  render() {
    var products = this.props.products;
    if (this.state.selected_tag_ids.length) {
      products = this.filterBySelectedTags(products);
    }
    products = this.sort(products);
    return (
      <div className="container-fluid products products-tags-search">
        <div className="row">
          <div className="sidebar col-xs-6 col-sm-6 col-md-3">
            <nav>
              <div className="tags-tree">
                <Tags tags={this.props.tags} tag_categories={this.props.tag_categories}/>
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

