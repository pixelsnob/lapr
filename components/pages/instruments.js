
import React from 'react';
import Products from '../products';
import ProductCategories from '../product_categories';
import SortDirection from '../sort_direction';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product_category_id:  null,
      sort_direction:       1
    };
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

  componentWillMount() {
    this.categorySlugToId(this.props.params.category);
  }
  
  componentWillReceiveProps(props) {
    this.categorySlugToId(props.params.category);
  }

  handleProductCategoryChange = product_category_id => {
    this.setState({ product_category_id });
  }

  handleProductCategoryReset = () => {
    this.setState({ product_category_id: null });
  }
  
  categorySlugToId(slug) {
    var product_category = this.props.product_categories.find(category =>
      category.slug == slug
    );
    if (product_category) {
      this.setState({
        product_category_id: product_category._id,
        selected_tag_ids: []
      });
    }
  }
  
  getCategoryHeading() {
    if (this.state.product_category_id) {
      var category = this.props.product_categories.find(product_category =>
        product_category._id == this.state.product_category_id
      );
      if (category.name) {
        return category.name;
      }
    } else {
      return 'All Instruments';
    }
  }

  filterByCategoryId() {
    if (!this.state.product_category_id) {
      return this.props.products;
    }
    return this.props.products.filter(product =>
      product.categories.find(category =>
        category._id == this.state.product_category_id
      )
    );
  }

  render() {
    var products = this.sort(this.filterByCategoryId());
    return (
      <div className="container-fluid products products-categories-search">
        <div className="row">
          <div className="sidebar col-xs-6 col-sm-6 col-md-3">
            <nav>
              <div className="categories">
                <ProductCategories
                  product_categories={this.props.product_categories}
                  product_category_id={this.state.product_category_id}
                  onReset={this.handleProductCategoryReset}
                />
              </div>
            </nav>
          </div>
          <div className="products-results col-xs-6 col-sm-6 col-md-9">
            <div id="heading-container">
              <h2 className="line-after">{this.getCategoryHeading()}</h2>
              <div className="more-info-container hide">
                <a href="javascript:void(0);" className="more-info">More&hellip;</a>
              </div>
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

