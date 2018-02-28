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
    this.state = {
      isLoading: false,
      error: null,
      errorCount: 0,
      filterValue: 0,
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
   * Handle a change caused by an event
   * @param {*} event Event that called the change
   * @param {*} index Index, idk?
   * @param {*} value Value after the change
   */
  handleChange(event, index, value) {
    this.setState({ filterValue: value });
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

    console.log(this.handleChange);

    return (
      <div>
        <Paper style={styles.paperContainer} zDepth={1} >
          <p>Filter value: {this.state.filterValue}</p>
          <ShopSearchFilter value={this.state.filterValue} onChange={this.handleChange.bind(this)} />
          <ShopCardList shops={this.state.shops} />
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
