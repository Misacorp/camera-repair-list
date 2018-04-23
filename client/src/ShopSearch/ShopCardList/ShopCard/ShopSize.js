import React from 'react';
import PropTypes from 'prop-types';

import PeopleIcon from 'material-ui/svg-icons/social/people';
import PersonIcon from 'material-ui/svg-icons/social/person';

const styles = {
  container: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  icon: {
    width: '50px',
    height: 'auto',
  },
  text: {
    display: 'block',
  },
};

function ShopSize(props) {
  const { size } = props;
  const isPlural = size > 1;

  return (
    <div style={styles.container} >
      {isPlural ?
        <PeopleIcon style={styles.icon} /> :
        <PersonIcon style={styles.icon} />
      }
      <div style={styles.text}>
        <h3>{size}</h3>
        <p>{isPlural ? 'Mechanics' : 'Mechanic'} working at this shop.</p>
      </div>
    </div>
  );
}

export default ShopSize;

ShopSize.propTypes = {
  size: PropTypes.number,
};

ShopSize.defaultProps = {
  size: 1,
};
