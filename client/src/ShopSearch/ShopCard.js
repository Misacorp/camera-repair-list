import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import ColList from './ColList';
import ConditionalText from './ConditionalText';
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
                <ConditionalText text="Analog Mechanical Cameras" enabled={shop.equipment1} />,
                <ConditionalText text="Analog Electronic Cameras" enabled={shop.equipment2} />,
                <ConditionalText text="Manual Focus Lenses" enabled={shop.equipment3} />,
                <ConditionalText text="Autofocus Lenses" enabled={shop.equipment4} />,
                <ConditionalText
                  text="Modern Digital Cameras and Lenses"
                  enabled={shop.equipment5}
                />,
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
    equipment1: PropTypes.bool,
    equipment2: PropTypes.bool,
    equipment3: PropTypes.bool,
    equipment4: PropTypes.bool,
    equipment5: PropTypes.bool,
    future: PropTypes.string,
  }),
};

ShopCard.defaultProps = {
  shop: { shopname: 'Defaul shop' },
};

export default ShopCard;
