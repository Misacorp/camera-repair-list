import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

const styles = {
  defaultSelection: {
    color: '#AAA',
  },
};

class ShopSearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  }

  handler(name, value) {
    this.props.onChange(name, value);
  }


  render() {
    const {
      defaultValue,
      name,
      value,
      entries,
    } = this.props;

    return (
      <DropDownMenu
        value={value}
        onChange={(event, index, newValue) => {
          this.handler(name, newValue);
        }}
        labelStyle={defaultValue === value ? styles.defaultSelection : null}
      >
        <MenuItem
          value={defaultValue}
          primaryText={defaultValue}
        />
        {entries.map(country =>
          <MenuItem value={country} primaryText={country} key={country} />)}
      </DropDownMenu>
    );
  }
}

ShopSearchFilter.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])),
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

ShopSearchFilter.defaultProps = {
  entries: [],
  defaultValue: 'All',
  name: '',
  onChange: {},
  value: '',
};

export default ShopSearchFilter;
