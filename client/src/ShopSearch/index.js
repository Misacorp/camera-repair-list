import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Shop from './Shop';
import ShopSearchFilter from './ShopSearchFilter';
import ShopCardList from './ShopCardList';
import cachedFetch from './cachedFetch';

const styles = {
  paperContainer: {
    width: '80%',
    margin: '1em auto',
  },
  shopCardList: {
    textAlign: 'center',
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '1em',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '1em',
  },
  errorText: {
    fontFamily: 'monospace',
    display: 'inline-block',
    backgroundColor: '#F0F0F0',
    padding: '0.75em',
    borderRadius: '3px',
  },
};


class ShopSearch extends React.Component {
  constructor(props) {
    super(props);
    this.defaultCountry = 'All countries',
    this.defaultSize = 'All sizes',
    this.state = {
      isLoading: false,
      error: null,
      errorCount: 0,
      countryFilter: this.defaultCountry,
      sizeFilter: this.defaultSize,
      shops: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    // Load shop data
    this.getShopData(this.props.source);
  }


  /**
   * Fetch shop data to populate cards.
   * @param string url URL from which to fetch shop data.
   */
  getShopData(url) {
    this.setState({ isLoading: true });

    // Get shop data from API
    cachedFetch(url, 86400) // One day cache
      .then((response) => {
        // Try to parse response as JSON
        response.json()
          .then((data) => {
            // Initialize Shop objects from the received data
            const shopObjects = data.map(shop => new Shop(shop));

            // Save shop data to state. Remove loading status.
            this.setState({
              isLoading: false,
              shops: shopObjects,
            });
          })
          .catch(() => this.handleFetchingError('Received data was unexpected'));
      })
      .catch((error) => {
        this.handleFetchingError(error);
      });
  }

  /**
   * Filter shops based on different conditions
   * @param {object} filters Shop key-value pairs
   */
  filterShops(filters) {
    let filteredShops = this.state.shops;
    // Filter by country
    if (this.state.countryFilter !== this.defaultCountry) {
      filteredShops = filteredShops.filter(shop => shop.country === filters.country);
    }
    // Filter by size
    if (this.state.sizeFilter !== this.defaultSize) {
      filteredShops = filteredShops.filter(shop => shop.size === filters.size);
    }
    return filteredShops;
  }


  /**
   * Handle a change caused by an event
   * @param {*} event Event that called the change
   * @param {*} index Index, idk?
   * @param {*} value Value after the change
   */
  handleChange(name, value) {
    this.setState({ [name]: value });
  }


  /**
   * Handle errors in fetching or parsing JSON data.
   * @param {object} error Error object
   */
  handleFetchingError(error) {
    // Save error to state. We are also no longer loading.
    const newErrCount = this.state.errorCount + 1;
    this.setState({
      error,
      errorCount: newErrCount,
      isLoading: false,
    });
  }


  render() {
    const { isLoading, error } = this.state;

    // Loading resulted in an error. Display a message and retry button.
    if (error) {
      return (
        <div style={styles.errorContainer} >
          <p>Oops! We were unable fetch repair shops for you.</p>
          <RaisedButton
            label={isLoading ? 'Loading...' : 'Try again'}
            secondary
            disabled={isLoading}
            onClick={() => {
              this.getShopData(this.props.source);
            }}
          />
          <br />
          <p style={styles.errorText}>{this.state.error.toString()} ({this.state.errorCount})</p>
        </div>
      );
    }

    // Shop data is loading. Display loading indicator.
    if (isLoading) {
      return (
        <div style={styles.loadingContainer} >
          <CircularProgress size={80} thickness={5} />
        </div>
      );
    }

    // List of countries
    const uniqueCountries = [...new Set(this.state.shops.map(shop => shop.country))];
    uniqueCountries.sort();
    // List of shop sizes
    const uniqueSizes = [...new Set(this.state.shops.map(shop => shop.size))];
    uniqueSizes.sort();

    return (
      <div>
        <Paper style={styles.paperContainer} zDepth={1} >
          <ShopSearchFilter
            name="countryFilter"
            default={this.defaultCountry}
            value={this.state.countryFilter}
            onChange={this.handleChange}
            countries={uniqueCountries}
          />
          <ShopSearchFilter
            name="sizeFilter"
            default={this.defaultSize}
            value={this.state.sizeFilter}
            onChange={this.handleChange}
            countries={uniqueSizes}
          />
          <ShopCardList shops={this.filterShops({
            country: this.state.countryFilter,
            size: this.state.sizeFilter,
          })} />
        </Paper>
      </div>
    );
  }
}

ShopSearch.propTypes = {
  source: PropTypes.string,
};

ShopSearch.defaultProps = {
  source: 'https://api.cameramakers.com/production',
};

export default ShopSearch;
