import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import styles from './styles.scss';

import Slider from 'components/commons/slider';
import Maps from 'components/commons/maps';
import AutoComplete from 'components/commons/autoCOmplete';

class Home extends Component {
  state = {
    mapApiLoaded: false,
    coord: { lat: -23.551449, lng: -46.6565569 }
  }

  apiLoadedHandler = () => {
    this.setState({ mapApiLoaded: true });
  }

  setLatLng = ({ lat, lng }) => this.setState({ coord: { lat, lng } })

  render() {
    const { mapApiLoaded, coord } = this.state;
    return (
      <div className={styles.home}>
        <div className={styles.bannerMaps}>
          <Maps
            mapApiLoaded={mapApiLoaded}
            apiLoadedHandler={this.apiLoadedHandler}
            coord={coord}
          />
          <div className={styles.sliderContainer}>
            <Slider />
          </div>
          <div className={styles.autoCompleteContainer}>
            {mapApiLoaded && <AutoComplete setLatLng={this.setLatLng} />}
          </div>
        </div>
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
