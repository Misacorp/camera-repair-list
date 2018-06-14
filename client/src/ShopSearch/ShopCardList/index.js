import React from 'react';
import PropTypes from 'prop-types';
import ShopCard from './ShopCard';
import Shop from '../Shop';

const styles = {
  shopCardList: {
    minHeight: 760,
    backgroundColor: '#FAFAFA',
  },
};

function ShopCardList(props) {
  console.log(`Shops: ${props.shops.length}`);
  return (
    <div style={styles.shopCardList}>
      { props.shops.map(shop => (
        <ShopCard key={shop.shopname} shop={shop} />
      ))}
    </div>
  );
}


ShopCardList.propTypes = {
  shops: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.instanceOf(Shop),
    PropTypes.object,
  ])),
};

ShopCardList.defaultProps = {
  shops: [],
};


export default ShopCardList;
