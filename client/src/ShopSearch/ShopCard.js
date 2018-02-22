import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import ColList from './ColList';
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
    const { shop } = this.state;

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
            <ColList
              title="Credibility"
              items={[
                shop.mentions,
                shop.relationship,
              ]}
            />

            <ColList
              title="Contact"
              items={[
                shop.website,
                shop.email,
              ]}
            />

            <ColList
              title="Services"
              items={[
                shop.equipment_1,
                shop.equipment_2,
                shop.equipment_3,
                shop.equipment_4,
                shop.equipment_5,
              ]}
            />

            <ColList
              title="Shop"
              items={[
                shop.type,
                shop.future,
              ]}
            />
          </CardText>
        </Card>
      </div>
    );
  }
}

ShopCard.propTypes = {
  shop: PropTypes.shape({
    mentions: PropTypes.string,
    shopName: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
    country: PropTypes.string,
    address: PropTypes.string,
    type: PropTypes.string,
    relationship: PropTypes.string,
    equipment_1: PropTypes.bool,
    equipment_2: PropTypes.bool,
    equipment_3: PropTypes.bool,
    equipment_4: PropTypes.bool,
    equipment_5: PropTypes.bool,
    future: PropTypes.string,
  }),
};

ShopCard.defaultProps = {
  shop: { shopname: 'Defaul shop' },
};

export default ShopCard;
