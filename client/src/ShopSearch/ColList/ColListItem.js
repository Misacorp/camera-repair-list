import React from 'react';
import PropTypes from 'prop-types';

function ColList(props) {
  const styles = {
    container: {
      width: `${100 / props.columns}%`,
      display: 'inline-block',
      verticalAlign: 'top',
    },
    title: {
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      {props.children}
    </div>
  );
}

ColList.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.number,
};

ColList.defaultProps = {
  children: 'Default content',
  columns: 2,
};

export default ColList;
