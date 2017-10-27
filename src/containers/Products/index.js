import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import { Grid, Col, Row } from 'react-flexbox-grid';

import styles from './styles.scss';

import Product from './product';

class Products extends Component {
  listOfProducts = data => {
    if (data.poc) {
      return data.poc.products.map(product => (
        <Col xs={12} sm={4} md={3} className={styles.gutterHeight}>
          <Product key={product.id} productData={product.productVariants[0]} />
        </Col>
      ));
    }
    return <div>loading</div>;
  }

  render() {
    const { data } = this.props;
    return (
      <div className={styles.products}>
        <Grid className={styles.productsList}>
          <Row>{this.listOfProducts(data)}</Row>
        </Grid>
      </div>
    );
  }
}

const queryAllProducts = gql`
  query pocCategorySearch($id: ID!, $search: String!, $categoryId: Int!) {
    poc(id: $id) {
      products(categoryId: $categoryId, search: $search) {
        id
        productVariants {
          title
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
