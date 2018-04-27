import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  enabledIcon: {
    color: 'red',
    backgroundColor: 'red',
  },
  enabledInput: {
    color: 'yellow',
    backgroundColor: 'yellow',
  },
  enabledText: {
    color: '#333',
  },
  disabled: {
    color: '#E0E0E0',
  },
};

function ConditionalText(props) {
  if (props.enabled) {
    // Enabled content
    return (
      <Checkbox
        label={props.text}
        inputStyle={styles.enabledInput}
        labelStyle={styles.enabledText}
        disabled
        checked
      />
    );
  }

  // Disabled content
  return (
    <Checkbox
      label={props.text}
      style={styles.disabled}
      disabled
    />
  );
}

ConditionalText.propTypes = {
  enabled: PropTypes.bool,
  text: PropTypes.string,
};

ConditionalText.defaultProps = {
  enabled: false,
  text: 'Conditional text',
};

export default ConditionalText;
