import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import ShopCard from './ShopCard';
import cachedFetch from './cachedFetch';

const styles = {
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


function stringToBool(val) {
  return (val.toLowerCase() === 'true');
}


class ShopCardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      isLoading: false,
      error: null,
      errorCount: 0,
    };
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
            // Go through data and change every "TRUE" value to an actual boolean.
            const shopData = data.map(shop => ({
              ...shop,
              equipment1: stringToBool(shop.equipment1),
              equipment2: stringToBool(shop.equipment2),
              equipment3: stringToBool(shop.equipment3),
              equipment4: stringToBool(shop.equipment4),
              equipment5: stringToBool(shop.equipment5),
            }));

            // Save shop data to state. Remove loading status.
            this.setState({
              isLoading: false,
              shops: shopData,
            });
          })
          .catch(() => this.handleFetchingError('Received data was unexpected'));
      })
      .catch((error) => {
        this.handleFetchingError(error);
      });
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

    // Shop data was successfully loaded. Show the list.
    return (
      <div>
        { this.state.shops.map(shop => (
          <ShopCard key={shop.shopname} shop={shop} />
        ))}
      </div>
    );
  }
}


ShopCardList.propTypes = {
  source: PropTypes.string,
};

ShopCardList.defaultProps = {
  source: '',
};


export default ShopCardList;
