import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import InlineText from './InlineText';

const styles = {
  enabledIcon: {
    color: 'red',
  },
  enabledText: {
    color: '#333',
  },
  disabled: {
    color: '#E0E0E0',
  },
};

class ConditionalText extends InlineText {
  render() {
    // Text is enabled
    if (this.props.enabled) {
      return (
        <Checkbox
          label={this.props.text}
          inputStyle={styles.enabled}
          labelStyle={styles.enabledText}
          disabled
          checked
        />
      );
    }

    // Text is disabled
    return (
      <Checkbox
        label={this.props.text}
        style={styles.disabled}
        disabled
      />
    );
  }
}

ConditionalText.propTypes = {
  enabled: PropTypes.bool,
};

ConditionalText.defaultProps = {
  enabled: false,
};

export default ConditionalText;
