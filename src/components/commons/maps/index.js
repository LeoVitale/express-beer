import React, { Component } from 'react';
import styles from './styles.scss';
import PinIcon from 'images/pin-beer.svg';
import GoogleMapReact from 'google-map-react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const Pin = ({ text }) => (
  <div className={styles.pin}>
    <img src={PinIcon} alt="Pin" />
  </div>
);

class Maps extends Component {
  state = {
    mapLoaded: false
  }

  static defaultProps = {
    center: { lat: -23.551449, lng: -46.6565569 },
    zoom: 18
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
          { saturation: 0 },
          { gamma: 0.8 },
          { lightness: 4 },
          { visibility: 'on' }
        ]
      }
    ]
  })

  render() {
    const { mapLoaded } = this.state;
    const { lat, lng } = this.props.coord;
    return (
      <div className={styles.maps}>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{
            key: 'AIzaSyBFesIO0jwCc_FD1pdE40Rf-fWwHvgQu9Y',
            libraries: 'geometry,drawing,places'
          }}
          onGoogleApiLoaded={this.onGoogleApiLoaded}
          defaultCenter={{ lat: -23.551449, lng: -46.6565569 }}
          center={{ lat, lng }}
          zoom={this.props.zoom}
          options={this.createMapOptions}
        >
          <Pin lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Maps;
