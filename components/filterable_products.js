
import React from 'react';
import ProductsComponent from './products';
import ProductsSortDirectionComponent from './products_sort_direction';
import ProductCategoriesComponent from './product_categories';
import TagsComponent from './tags';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sort_direction:       1,
      product_category_id:  null,
      selected_tag_ids:     []
    };
  }

  componentWillMount() {
    this.categorySlugToId(this.props.params.category);
  }
  
  componentWillReceiveProps(props) {
    this.categorySlugToId(props.params.category);
  }

  sort(products) {
    return products.slice().sort((a, b) => {
      var comp = a.name.localeCompare(b.name);
      return (this.state.sort_direction == -1 ? -comp : comp);
    });
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

  handleSortDirectionChange = () => {
    this.setState({ sort_direction: -this.state.sort_direction });
  }
  
  handleProductCategoryChange = product_category_id => {
    this.setState({ product_category_id, selected_tag_ids: [] });
  }

  handleProductCategoryReset = () => {
    this.setState({ product_category_id: null });
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

  filterByCategoryId() {
    return this.props.products.filter(product =>
      product.categories.find(category =>
        category == this.state.product_category_id
      )
    );
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
    if (this.state.product_category_id) {
      products = this.filterByCategoryId(this.state.product_category_id);
    }
    if (this.state.selected_tag_ids.length) {
      products = this.filterBySelectedTags(products);
    }
    products = this.sort(products);
    return (
      <div id="filterable_products">
        <div className="col-xs-4">
          <ProductCategoriesComponent
            product_categories={this.props.product_categories}
            product_category_id={this.state.product_category_id}
            onReset={this.handleProductCategoryReset}
          />
        </div>
        <div className="col-xs-4">
          <TagsComponent
            tags={this.getFilteredTags(products)}
            tag_categories={this.props.tag_categories}
            products={products}
            selected_tag_ids={this.state.selected_tag_ids}
            onTagSelect={this.handleTagSelect}
            onReset={this.handleTagsReset}
          />
        </div>
        <div className="col-xs-4">
          <ProductsSortDirectionComponent
            sort_direction={this.state.sort_direction}
            onChange={this.handleSortDirectionChange}
          />
          <ProductsComponent
            products={products}
            sort_direction={this.state.sort_direction}
          />
        </div>
      </div>
    );
  }
}

