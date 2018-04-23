import React from 'react';
import PropTypes from 'prop-types';

import StoreIcon from 'material-ui/svg-icons/action/store';

function ShopType(props) {
  const { type, iconStyle } = props;

  return (
    <div>
      <StoreIcon style={iconStyle} />
      Type: {type}
    </div>
  );
}

export default ShopType;

ShopType.propTypes = {
  type: PropTypes.number,
  iconStyle: PropTypes.shape,
};

ShopType.defaultProps = {
  type: 1,
  iconStyle: {},
};
