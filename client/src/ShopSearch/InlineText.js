import React from 'react';
import PropTypes from 'prop-types';

class InlineText extends React.Component {
  getText() {
    return this.props.text;
  }
}

InlineText.propTypes = {
  text: PropTypes.string,
};

InlineText.defaultProps = {
  text: 'Text',
};

export default InlineText;
