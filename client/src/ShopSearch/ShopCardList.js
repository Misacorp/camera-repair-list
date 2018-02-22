import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import ShopCard from './ShopCard';

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

    fetch(url, {
      headers: {
        'Cache-Control': 'max-age=3600',
      },
    })
      .then((response) => {
        this.setState({ isLoading: true });
        try {
          // Try to parse response as JSON
          response.json()
            .then((data) => {
              this.setState({ isLoading: false });
              this.setState({
                shops: data,
              });
            })
            .catch((error) => {
              this.handleFetchingError(error);
            });
        } catch (error) {
          this.handleFetchingError(error);
        }
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
    this.setState({ error, errorCount: newErrCount, isLoading: false });
  }


  render() {
    const { isLoading, error } = this.state;

    // Loading resulted in an error. Display a message and retry button.
    if (error) {
      return (
        <div style={{ textAlign: 'center' }} >
          <p>Oops! We were unable fetch repair shops for you.</p>
          <p>{this.state.error.toString()} ({this.state.errorCount})</p>
          <RaisedButton
            label="Try again"
            secondary
            onClick={() => {
              this.getShopData(this.props.source);
            }}
          />
        </div>
      );
    }

    // Shop data is loading. Display loading indicator.
    if (isLoading) {
      return (
        <div style={{ textAlign: 'center' }} >
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
