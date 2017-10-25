import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import styles from './styles.scss';

class Home extends Component {
  render() {
    console.log('====================================');
    console.log(this.props, styles);
    console.log('====================================');
    return <div className={styles.home2}>Home</div>;
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

export default graphql(query)(Home);
