import React from 'react';
import PropTypes from 'prop-types';
import UpdateIcon from 'material-ui/svg-icons/action/update';

function ShopFuture(props) {
  const { future, iconStyle } = props;

  return (
    <div>
      <UpdateIcon style={iconStyle} />
      Future: { future }
    </div>
  );
}

export default ShopFuture;

ShopFuture.propTypes = {
  future: PropTypes.number,
  iconStyle: PropTypes.shape,
};

ShopFuture.defaultProps = {
  future: 1,
  iconStyle: {},
};
