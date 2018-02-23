import React from 'react';
import PropTypes from 'prop-types';
import InlineText from '../InlineText';

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
      {props.content}
    </div>
  );
}

ColList.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(InlineText),
  ]),
};

ColList.defaultProps = {
  content: 'Default content',
};

export default ColList;
