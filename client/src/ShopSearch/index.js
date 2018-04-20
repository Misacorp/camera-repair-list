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
      equipment: 'Equipment type',
    };
    this.state = {
      isLoading: false,
      error: null,
      errorCount: 0,
      countryFilter: [this.defaults.country],
      sizeFilter: [this.defaults.size],
      equipmentFilter: [this.defaults.equipment],
      shops: [],
    };
    this.equipment = [
      'Analog Mechanical Cameras',
      'Analog Electronic Cameras',
      'Manual Focus Lenses',
      'Autofocus Lenses',
      'Modern Digital Cameras and Lenses',
    ];

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
   * @param {object} filters Shop key-value pairs ex. { country: 'Finland', size: '4' }
   */
  filterShops(filters) {
    const { countryFilter, sizeFilter, equipmentFilter } = this.state;
    let shopList = this.state.shops;

    // Filter by country
    if (countryFilter.indexOf(this.defaults.country) < 0) {
      shopList = shopList.filter(shop => filters.country.indexOf(shop.country) > -1);
    }
    // Filter by size
    if (sizeFilter.indexOf(this.defaults.size) < 0) {
      shopList = shopList.filter(shop => filters.size.indexOf(shop.size) > -1);
    }

    // Filter by equipment
    if (equipmentFilter.indexOf(this.defaults.equipment) < 0) {
      // Initialize an empty array where we will eventually add shops that pass the equipment filter
      const goodShops = [];

      // Loop through all shop entries
      for (let i = 0; i < shopList.length; i += 1) {
        /**
         * Shops store the equipment they service as an array of booleans
         * ex. [true, false, false, true, false]
         *
         * Here we will transform this array into a string array of what the shop actually services.
         * ex. ['Analog Mechanical Cameras', 'Autofocus Lenses']
         *
         * Using this array we can apply filters to shop equipment.
         */

        const shop = shopList[i];

        // Initialize an array to store what equipment a shop services in string form.
        const shopEquipment = [];

        // Go through all possible equipment strings ex. 'Analog Mechanical Cameras'
        for (let j = 0; j < this.equipment.length; j += 1) {
          /**
           * If a shop's equipment# property is true for a particular string, add it to
           * shopEquipment.
           * Equipment# properties are numbered 1-5 so we use 'j + 1'.
           */
          if (shop[`equipment${j + 1}`]) shopEquipment.push(this.equipment[j]);
        }

        // Compare shopEquipment with current set of equipment filters.
        // If shopEquipment contains all the wanted equipment, add it to shopList.
        const isGood = equipmentFilter.every(item => shopEquipment.includes(item));
        if (isGood) goodShops.push(shop);
      }

      // Update shopList with newly filtered shops.
      shopList = goodShops;
    }

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
      equipmentFilter,
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
    // List of equipment
    const { equipment } = this;

    return (
      <div>
        <ShopSearchMultiFilter
          name="countryFilter"
          defaultValue={this.defaults.country}
          value={countryFilter}
          onChange={this.handleChange}
          entries={uniqueCountries}
        />
        <ShopSearchMultiFilter
          name="sizeFilter"
          defaultValue={this.defaults.size}
          value={sizeFilter}
          onChange={this.handleChange}
          entries={uniqueSizes}
          multiple
        />
        <ShopSearchMultiFilter
          name="equipmentFilter"
          defaultValue={this.defaults.equipment}
          value={equipmentFilter}
          onChange={this.handleChange}
          entries={equipment}
          multiple
        />
        <ShopCardList shops={this.filterShops({
          country: countryFilter,
          size: sizeFilter,
          equipment: equipmentFilter,
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
