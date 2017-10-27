import React, { Component } from 'react';

import { connect } from 'react-redux';
import styles from './styles.scss';
import { setQuerieValue } from 'reducers/home';
import { updatePocId } from 'reducers/products';
import Slider from 'components/commons/slider';
import Maps from 'components/commons/maps';
import AutoComplete from 'components/commons/autoComplete';

class Home extends Component {
  state = {
    mapApiLoaded: false,
    querieValues: {
      lat: -23.5554016,
      lng: -46.6012159,
      algorithm: 'NEAREST',
      date: new Date().toISOString()
    }
  }

  apiLoadedHandler = () => {
    this.setState({ mapApiLoaded: true });
  }

  fetchQuerie = ({ lat, lng }) => {
    const { dispatch, data } = this.props;
    const date = new Date().toISOString();
    this.setState({
      querieValues: {
        lat,
        lng,
        date,
        algorithm: 'NEAREST'
      }
    });
  }

  render() {
    const { mapApiLoaded, querieValues } = this.state;
    const { updatePocId, pocId } = this.props;

    return (
      <div className={styles.home}>
        <div className={styles.bannerMaps}>
          <Maps
            mapApiLoaded={mapApiLoaded}
            apiLoadedHandler={this.apiLoadedHandler}
            querieValues={querieValues}
            updatePocId={updatePocId}
            pocId={pocId}
          />
          <div className={styles.sliderContainer}>
            <Slider />
          </div>
          <div className={styles.autoCompleteContainer}>
            {mapApiLoaded && (
              <AutoComplete
                fetchQuerie={this.fetchQuerie}
                disableButtom={pocId === '0'}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  home: state.home,
  pocId: state.products.pocId
});

const mapDispatchToProps = dispatch => ({
  setQuerieValue: querie => {
    dispatch(setQuerieValue(querie));
  },
  updatePocId: id => {
    dispatch(updatePocId(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
