import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import styles from './styles.scss';

import Slider from 'components/commons/slider';

class Home extends Component {
  render() {
    return (
      <div className={styles.home}>
        <Slider />
      </div>
    );
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
