import React from 'react';
import PropTypes from 'prop-types';

import PeopleIcon from 'material-ui/svg-icons/social/people';
import PersonIcon from 'material-ui/svg-icons/social/person';

function ShopSize(props) {
  const { size, iconStyle } = props;

  return (
    <div>
      {size > 1 ?
        <PeopleIcon style={iconStyle} /> :
        <PersonIcon style={iconStyle} />
      }
      Size: {size}
    </div>
  );
}

export default ShopSize;

ShopSize.propTypes = {
  size: PropTypes.number,
  iconStyle: PropTypes.shape,
};

ShopSize.defaultProps = {
  size: 1,
  iconStyle: {},
};
