import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';

import styles from './styles.scss';

import Product from './product';

class Products extends Component {
  listOfProducts = data => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    if (data.poc) {
      return data.poc.products.map(product => (
        <Product productData={product.productVariants[0]} />
      ));
    }
    return <div>ddd</div>;
  }

  render() {
    const { data } = this.props;
    return <div>{this.listOfProducts(data)}</div>;
  }
}

const queryAllProducts = gql`
  query pocCategorySearch($id: ID!, $search: String!, $categoryId: Int!) {
    poc(id: $id) {
      products(categoryId: $categoryId, search: $search) {
        productVariants {
          title
          description
          imageUrl
          price
        }
      }
    }
    categories: allCategory {
      title
      id
    }
  }
`;

const ProductsGraphQL = graphql(queryAllProducts, {
  options: ({ pocId, search, categoryId }) => ({
    variables: {
      id: pocId,
      search: '',
      categoryId: 0
    }
  })
})(Products);

const mapStateToProps = state => ({
  pocId: state.products.pocId
});

export default connect(mapStateToProps)(ProductsGraphQL);
