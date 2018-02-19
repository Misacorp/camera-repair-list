import React from 'react';
import PropTypes from 'prop-types';
import ShopCard from './ShopCard';
import sampleData from './sampleData.json';

class ShopCardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shops: [] };
  }


  /**
   * Populate shop list with data
   */
  componentDidMount() {
    fetch(this.props.source)
      .then((response) => {
        try {
          // Try to parse response as JSON
          response.json()
            .then((data) => {
              console.log('[OK] Fetched shop data');
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
   * Handle errors in fetching or parsin JSON data.
   * @param {object} error Error object
   */
  handleFetchingError(error) {
    console.log('[ERR] Could not fetch shop data ', error);
    this.setState({
      shops: sampleData,
    });
  }

  render() {
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
