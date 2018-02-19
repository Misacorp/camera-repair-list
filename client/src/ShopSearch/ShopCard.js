import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import loadingIcon from '../assets/img/ic_image_white_24px.svg';
import flagFetcher from './flagFetcher';

class ShopCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flagImage: loadingIcon,
      shop: props.shop,
    };
  }

  /**
   * Get country flags
   */
  componentWillMount() {
    flagFetcher.getFlag(this.state.shop.country)
      .then((countryFlagURL) => {
        this.setState({
          flagImage: countryFlagURL,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let subtitle = this.state.shop.country;
    if (this.state.shop.address) {
      subtitle = `${this.state.shop.address}, ${subtitle}`;
    }

    return (
      <div>
        <Card>
          <CardHeader
            title={this.state.shop.shopname}
            subtitle={subtitle}
            actAsExpander
            showExpandableButton
            avatar={this.state.flagImage}
          />
          <CardText expandable>
            <ul>
              <li>Mentions: {this.state.shop.mentions}</li>
              <li>Email: {this.state.shop.email}</li>
              <li>Website: {this.state.shop.website}</li>
              <li>Type: {this.state.shop.type}</li>
              <li>Relationship: {this.state.shop.relationship}</li>
              <li>EQ1: {this.state.shop.equipment_1}</li>
              <li>EQ2: {this.state.shop.equipment_2}</li>
              <li>EQ3: {this.state.shop.equipment_3}</li>
              <li>EQ4: {this.state.shop.equipment_4}</li>
              <li>EQ5: {this.state.shop.equipment_5}</li>
              <li>Future: {this.state.shop.future}</li>
            </ul>
            <Subheader>Contact</Subheader>
            <p>{this.state.shop.website}</p>
            <p>{this.state.shop.email}</p>
          </CardText>
        </Card>
      </div>
    );
  }
}

ShopCard.propTypes = {
  shop: PropTypes.shape({
    mentions: PropTypes.number,
    shopName: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
    country: PropTypes.string,
    address: PropTypes.string,
    type: PropTypes.number,
    relationship: PropTypes.number,
    equipment_1: PropTypes.bool,
    equipment_2: PropTypes.bool,
    equipment_3: PropTypes.bool,
    equipment_4: PropTypes.bool,
    equipment_5: PropTypes.bool,
    future: PropTypes.number,
  }),
};

ShopCard.defaultProps = {
  shop: { shopname: 'Defaul shop' },
};

export default ShopCard;
