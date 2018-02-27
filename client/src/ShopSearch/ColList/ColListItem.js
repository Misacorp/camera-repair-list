import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  container: {
    width: '50%',
    display: 'inline-block',
  },
  title: {
    fontWeight: 'bold',
  },
};

function ColList(props) {
  return (
    <div style={styles.container}>
      {props.children}
    </div>
  );
}

ColList.propTypes = {
  children: PropTypes.node,
};

ColList.defaultProps = {
  children: 'Default content',
};

export default ColList;
