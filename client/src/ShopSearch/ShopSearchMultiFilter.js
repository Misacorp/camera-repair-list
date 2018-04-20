import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  main: {
    display: 'inline-block',
    color: '#AAA',
    marginRight: '1em',
  },
  defaultSelection: {
    color: 'red',
  },
};

function handleChange(handler, item) {
  handler(item.name, item.value);
}

/**
 * Returns a Select element for users to filter a data set.
 * Supports multiple selection.
 */
function ShopSearchMultiFilter(props) {
  const {
    entries,
    defaultValue,
    name,
    value,
    multiple,
    onChange,
  } = props;

  /**
   * Multiple selection SelectFields display values from an array.
   * Single selection SelectFields require a string value.
   * Since the value prop is an array, we extract the first value if multiple is false.
   */
  const displayValue = multiple ? value : value[0];

  return (
    <div style={styles.main}>
      <SelectField
        value={displayValue}
        onChange={(event, index, values) => {
          // If the default value is selected, remove all other selections.
          // If another value is selected, remove default value.
          let oldValues = value;
          if (value.constructor !== Array) oldValues = new Array(value);
          let newValues = values;

          if (values.constructor !== Array) newValues = new Array(newValues);

          // Was default value previously selected?
          if (oldValues.indexOf(defaultValue) > -1) {
            // Default was previously selected. Remove it from selection.
            newValues = newValues.filter(item => item !== defaultValue);
          }

          // Was default value just selected?
          if (newValues.indexOf(defaultValue) > -1) {
            // Default value was selected just now. Remove all other selections
            newValues = newValues.filter(item => item === defaultValue);
          }

          // Revert to default if nothing is selected
          if (newValues.length === 0) newValues = [defaultValue];

          handleChange(onChange, { name, value: newValues });
        }}
        labelStyle={defaultValue === value ? styles.defaultSelection : null}
        multiple={multiple}
        autoWidth
      >
        <MenuItem
          value={defaultValue}
          primaryText={defaultValue}
        />
        {entries.map(country =>
          <MenuItem value={country} primaryText={country} key={country} />)}
      </SelectField>
    </div>
  );
}

ShopSearchMultiFilter.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  multiple: PropTypes.bool,
};

ShopSearchMultiFilter.defaultProps = {
  entries: [],
  defaultValue: '',
  name: '',
  onChange: {},
  value: [],
  multiple: false,
};

export default ShopSearchMultiFilter;
