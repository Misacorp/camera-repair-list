import React from 'react';
import PropTypes from 'prop-types';

function ColList(props) {
  return (
    <div>
      <p>{props.content}</p>
    </div>
  );
}

ColList.propTypes = {
  content: PropTypes.string,
};

ColList.defaultProps = {
  content: 'Default content',
};

export default ColList;
