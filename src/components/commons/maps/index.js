import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import PinIcon from 'images/pin-beer.svg';
import GoogleMapReact from 'google-map-react';
import { graphql, gql } from 'react-apollo';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const Pin = () => (
  <div className={styles.pin}>
    <img src={PinIcon} alt="Pin" />
  </div>
);

class Maps extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const { updatePocId, data, pocId } = this.props;
    if (nextProps.data.pocSearch !== undefined) {
      if (
        nextProps.data.pocSearch.length > 0 &&
        nextProps.data.pocSearch[0].id !== pocId
      ) {
        updatePocId(nextProps.data.pocSearch[0].id);
      } else {
        updatePocId('0');
      }
    }
  }

  onGoogleApiLoaded = () => {
    const { apiLoadedHandler, mapApiLoaded } = this.props;
    if (!mapApiLoaded) {
      apiLoadedHandler();
    }
  }

  createMapOptions = () => ({
    panControl: false,
    mapTypeControl: false,
    scrollwheel: false,
    styles: [
      {
        stylers: [
          { saturation: -100 },
          { gamma: 0.8 },
          { lightness: 4 },
          { visibility: 'on' }
        ]
      }
    ]
  })

  render() {
    const {
      lat, lng, algorithm, date
    } = this.props.querieValues;

    return (
      <div className={styles.maps}>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{
            key: 'AIzaSyBFesIO0jwCc_FD1pdE40Rf-fWwHvgQu9Y',
            libraries: 'geometry,drawing,places'
          }}
          onGoogleApiLoaded={this.onGoogleApiLoaded}
          defaultCenter={{ lat, lng }}
          center={{ lat, lng }}
          zoom={18}
          options={this.createMapOptions}
        >
          <Pin lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

Maps.propTypes = {
  updatePocId: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  pocId: PropTypes.string.isRequired,
  apiLoadedHandler: PropTypes.func.isRequired,
  mapApiLoaded: PropTypes.bool.isRequired,
  querieValues: PropTypes.object.isRequired

};

const query = gql`
  query pocSearchMethod(
    $now: DateTime!
    $algorithm: String!
    $lat: String!
    $long: String!
  ) {
    pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
      id
      tradingName
    }
  }
`;

const MapsGraphQL = graphql(query, {
  options: props => {
    const {
      date, algorithm, lat, lng
    } = props.querieValues;
    return {
      variables: {
        now: date,
        algorithm,
        lat,
        long: lng
      }
    };
  }
})(Maps);

export default MapsGraphQL;
