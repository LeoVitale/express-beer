import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';

class Home extends Component {
  render() {
    console.log('====================================');
    console.log(this.props);
    console.log('====================================');
    return <div>Home</div>;
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
