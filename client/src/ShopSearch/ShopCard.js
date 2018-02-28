import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import GlobeIcon from 'material-ui/svg-icons/social/public';
import ColList from './ColList/';
import ColListItem from './ColList/ColListItem';
import ConditionalText from './ConditionalText';
import loadingIcon from '../assets/img/ic_image_white_24px.svg';
import flagFetcher from './flagFetcher';

const styles = {
  cardContainer: {
    paddingBottom: 0,
  },
  icon: {
    verticalAlign: 'middle',
    paddingRight: '1em',
  },
  cardText: {
    borderLeft: '5px solid #FBC02D',
    backgroundColor: '#FCFCFC',
  },
};

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
        <Card key={shop.shopname} containerStyle={styles.cardContainer} >
          <CardHeader
            title={this.state.shop.shopname}
            subtitle={subtitle}
            actAsExpander
            showExpandableButton
            avatar={this.state.flagImage}
          />
          <CardText
            expandable
            style={styles.cardText}
          >
            <ColList title="Credibility" >
              <ColListItem>Mentions: {shop.mentions}</ColListItem>
              <ColListItem>Relationship: {shop.relationship}</ColListItem>
            </ColList>

            <ColList title="Contact" >
              <ColListItem>
                <EmailIcon style={styles.icon} />{shop.email}
              </ColListItem>
              <ColListItem>
                <GlobeIcon style={styles.icon} />{shop.website}
              </ColListItem>
            </ColList>

            <ColList title="Services">
              <ColListItem>
                <ConditionalText text="Analog Mechanical Cameras" enabled={shop.equipment1} />
              </ColListItem>
              <ColListItem>
                <ConditionalText text="Analog Electronic Cameras" enabled={shop.equipment2} />
              </ColListItem>
              <ColListItem>
                <ConditionalText text="Manual Focus Lenses" enabled={shop.equipment3} />
              </ColListItem>
              <ColListItem>
                <ConditionalText text="Autofocus Lenses" enabled={shop.equipment4} />
              </ColListItem>
              <ColListItem>
                <ConditionalText
                  text="Modern Digital Cameras and Lenses"
                  enabled={shop.equipment5}
                />
              </ColListItem>
            </ColList>

            <ColList title="Shop" >
              <ColListItem>Type: {shop.type}</ColListItem>
              <ColListItem>Future: {shop.future}</ColListItem>
            </ColList>
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
  shop: { shopname: 'Default shop' },
};

export default ShopCard;
