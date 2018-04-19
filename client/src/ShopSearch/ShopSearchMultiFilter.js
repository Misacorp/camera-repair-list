import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  main: {
    display: 'inline-block',
    color: '#AAA',
  },
};

function handleChange(handler, item) {
  handler(item.name, item.value);
}

/**
 * Creates a checkbox toggle for each type of equipment.
 * One ShopSearchMultiFilter is required for each type of equipment.
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

  return (
    <div style={styles.main}>
      <SelectField
        value={value}
        onChange={(event, index, newValues) => {
          // If the default value is selected, remove all other selections. If another value is
          // selected, remove default value.
          const oldValues = value;
          let values = newValues;

          // Was default value previously selected?
          if (oldValues.indexOf(defaultValue) > -1) {
            // Default was previously selected. Remove it from selection.
            values = values.filter(item => item !== defaultValue);
          }

          // Was default value just selected?
          if (values.indexOf(defaultValue) > -1) {
            // Default value was selected just now. Remove all other selections
            values = values.filter(item => item === defaultValue);
          }

          // Revert to default if nothing is selected
          if (values.length === 0) values = [defaultValue];

          handleChange(onChange, { name, value: values });
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
  entries: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])),
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
