import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import { Grid, Col, Row } from 'react-flexbox-grid';
import { updateTotalPrice } from 'reducers/products';

import styles from './styles.scss';

import Product from './product';
import Filter from './filter';

class Products extends PureComponent {
  state = {
    price: 0
  }

  increasePrice = value => {
    const { updateTotalPrice, price } = this.props;
    this.setState({ price: this.state.price + value });
  }

  decreasePrice = value => {
    const { updateTotalPrice, price } = this.props;
    this.setState({ price: this.state.price - value });
  }

  filterByCategory = id => {
    const { data, pocId } = this.props;
    data.refetch({
      id: pocId,
      search: '',
      categoryId: id
    });
  }

  listOfProducts = data => {
    if (data.poc) {
      return data.poc.products.map(product => (
        <Col
          key={product.id}
          xs={12}
          sm={4}
          md={3}
          className={styles.gutterHeight}
        >
          <Product
            productData={product.productVariants[0]}
            increasePrice={this.increasePrice}
            decreasePrice={this.decreasePrice}
          />
        </Col>
      ));
    }
    return <div>loading</div>;
  }

  render() {
    const { data, price } = this.props;

    return (
      <div className={styles.products}>
        <Grid className={styles.productsList}>
          <Filter
            categories={data.categories}
            filterByCategory={this.filterByCategory}
          />
          <Row>{this.listOfProducts(data)}</Row>
        </Grid>
        <div className={styles.totalPrice}>
          <span className={styles.totalLabel}>
            R$ {parseFloat(this.state.price).toFixed(2)}
          </span>
        </div>
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
      id: pocId || '182',
      search: search || '',
      categoryId: categoryId || 0
    }
  })
})(Products);

const mapStateToProps = state => ({
  pocId: state.products.pocId
});

export default connect(mapStateToProps)(ProductsGraphQL);
