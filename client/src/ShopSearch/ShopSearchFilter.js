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
    return (
      <DropDownMenu
        value={this.props.value}
        onChange={(event, index, value) => {
          this.handler(this.props.name, value);
        }}
        labelStyle={this.props.default === this.props.value ? styles.defaultSelection : null}
      >
        <MenuItem
          value={this.props.default}
          primaryText={this.props.default}
        />
        {this.props.countries.map(country =>
          <MenuItem value={country} primaryText={country} key={country} />)}
      </DropDownMenu>
    );
  }
}

ShopSearchFilter.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.string),
  default: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

ShopSearchFilter.defaultProps = {
  countries: [],
  default: 'All',
  name: '',
  onChange: {},
  value: '',
};

export default ShopSearchFilter;
