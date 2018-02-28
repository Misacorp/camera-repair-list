import React from 'react';
import PropTypes from 'prop-types';
import ShopCard from './ShopCard';
import Shop from './Shop';

function ShopCardList(props) {
  return (
    <div>
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
