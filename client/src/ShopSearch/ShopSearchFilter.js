import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

class ShopSearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  render() {
    console.log(this.props.handleChange);

    return (
      <DropDownMenu value={this.state.value} onChange={this.props.handleChange}>
        <MenuItem value={1} primaryText="Never" />
        <MenuItem value={2} primaryText="Every Night" />
        <MenuItem value={3} primaryText="Weeknights" />
        <MenuItem value={4} primaryText="Weekends" />
        <MenuItem value={5} primaryText="Weekly" />
      </DropDownMenu>
    );
  }
}

ShopSearchFilter.propTypes = {
  handleChange: PropTypes.object,
  countries: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.number,
};

ShopSearchFilter.defaultProps = {
  handleChange: {},
  countries: [],
  value: '',
};

export default ShopSearchFilter;
