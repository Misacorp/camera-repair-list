import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Shop from './Shop';
import ShopSearchMultiFilter from './ShopSearchMultiFilter';
import ShopCardList from './ShopCardList';
import cachedFetch from './cachedFetch';

const styles = {
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
    this.defaults = {
      country: 'All countries',
      size: 'All sizes',
    };
    this.state = {
      isLoading: false,
      error: null,
      errorCount: 0,
      countryFilter: [this.defaults.country],
      sizeFilter: [this.defaults.size],
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
    let shopList = this.state.shops;

    // Filter by country
    if (this.state.countryFilter.indexOf(this.defaults.country) < 0) {
      // Check selected country filters
      shopList = shopList.filter(shop => filters.country.indexOf(shop.country) > -1);
    }
    // Filter by size
    if (this.state.sizeFilter.indexOf(this.defaults.size) < 0) {
      console.log('Applying size filter');
      // Shop sizes are numbers whereas the size values in our filter are strings.
      // Cast size value to string before comparing.
      // TODO: Treat sizes as strings from the beginning.
      shopList = shopList.filter(shop => filters.size.indexOf(shop.size) > -1);
    }
    console.log(shopList);

    return shopList;
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
    const {
      isLoading,
      error,
      errorCount,
      shops,
      sizeFilter,
      countryFilter,
    } = this.state;

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
          <p style={styles.errorText}>{error.toString()} ({errorCount})</p>
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
    const uniqueCountries = [...new Set(shops.map(shop => shop.country))];
    uniqueCountries.sort();
    // List of shop sizes
    const uniqueSizes = [...new Set(shops.map(shop => shop.size))];
    uniqueSizes.sort();

    return (
      <div>
        <ShopSearchMultiFilter
          name="countryFilter"
          defaultValue={this.defaults.country}
          value={countryFilter}
          onChange={this.handleChange}
          entries={uniqueCountries}
          multiple
        />
        <ShopSearchMultiFilter
          name="sizeFilter"
          defaultValue={this.defaults.size}
          value={sizeFilter}
          onChange={this.handleChange}
          entries={uniqueSizes}
          multiple
        />
        <ShopCardList shops={this.filterShops({
          country: countryFilter,
          size: sizeFilter,
        })}
        />
      </div>
    );
  }
}

ShopSearch.propTypes = {
  source: PropTypes.string,
};

ShopSearch.defaultProps = {
  source: 'https://nlotov46uh.execute-api.eu-west-1.amazonaws.com/dev/getRepairShops',
};

export default ShopSearch;
