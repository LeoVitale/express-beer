import React, { Component } from 'react';
import styles from './styles.scss';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      loading: false
    };
  }

  onChange = address => this.setState({ address })

  handleSelect = address => {
    this.setState({
      address,
      loading: true
    });
    const { setLatLng } = this.props;
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Success Yay', { lat, lng });
        setLatLng({ lat, lng });
        this.setState({
          loading: false
        });
      })
      .catch(error => {
        console.log('Oh no!', error);
        this.setState({
          loading: false
        });
      });
  }

  render() {
    const { loading } = this.state;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };

    return (
      <form className={styles.autoComplete}>
        <PlacesAutocomplete
          onSelect={this.handleSelect}
          inputProps={inputProps}
        />
      </form>
    );
  }
}

export default AutoComplete;
