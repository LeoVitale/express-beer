import React, { Component } from 'react';
import Link from 'redux-first-router-link';
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

  onFocus = () => console.log('focus')

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
      autoFocus: true,
      placeholder: 'Endereço de entrega',
      onChange: this.onChange,
      onFocus: this.onFocus
    };

    return (
      <div className={styles.autoComplete}>
        <PlacesAutocomplete
          onSelect={this.handleSelect}
          inputProps={inputProps}
          classNames={{
            root: styles.root,
            input: styles.searchInput,
            autocompleteContainer: styles.autoCompleteContainer,
            googleLogoImage: styles.googleLogoImage
          }}
        />
        <Link
          tagName="button"
          className={styles.continueButton}
          href="/products"
          to="/products"
        >
          Continuar
        </Link>
      </div>
    );
  }
}

export default AutoComplete;
