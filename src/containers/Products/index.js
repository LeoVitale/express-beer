import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, gql } from 'react-apollo';

import styles from './styles.scss';

@connect(state => ({
  title: state.title
}))
class Products extends Component {
  render() {
    return <div>Products</div>;
  }
}

const query = gql`
  {
    allCategory {
      title
      id
    }
  }
`;

export default graphql(query)(Products);
