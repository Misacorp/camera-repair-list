import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import GlobeIcon from 'material-ui/svg-icons/social/public';

import ColList from '../../ColList/';
import ColListItem from '../../ColList/ColListItem';
import ConditionalText from './ConditionalText';
import CredibilityScore from './CredibilityScore';
import Shop from '../../Shop';
import ShopFact from './ShopFact';

import flagFetcher from './flagFetcher';
import loadingIcon from '../../../assets/img/ic_image_white_24px.svg';

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

    // Tweak columns based on component width
    const { width } = this.props.size;

    let contactColumns = 2;
    let equipmentColumns = 2;
    let shopFactColumns = 3;

    if (width < 700) {
      contactColumns = 1;
      equipmentColumns = 1;
    }
    if (width < 500) {
      shopFactColumns = 1;
    }

    // Build a shop's 'subtitle' from its address
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
            <ColList title="Contact" >
              <ColListItem columns={contactColumns}>
                <EmailIcon style={styles.icon} />{shop.email}
              </ColListItem>
              <ColListItem columns={contactColumns}>
                <GlobeIcon style={styles.icon} /><a href={shop.website}>{shop.website}</a>
              </ColListItem>
            </ColList>

            <ColList title="Services">
              <ColListItem columns={equipmentColumns}>
                <ConditionalText text="Analog Mechanical Cameras" enabled={shop.equipment1} />
              </ColListItem>
              <ColListItem columns={equipmentColumns}>
                <ConditionalText text="Analog Electronic Cameras" enabled={shop.equipment2} />
              </ColListItem>
              <ColListItem columns={equipmentColumns}>
                <ConditionalText text="Manual Focus Lenses" enabled={shop.equipment3} />
              </ColListItem>
              <ColListItem columns={equipmentColumns}>
                <ConditionalText text="Autofocus Lenses" enabled={shop.equipment4} />
              </ColListItem>
              <ColListItem columns={equipmentColumns}>
                <ConditionalText
                  text="Modern Digital Cameras and Lenses"
                  enabled={shop.equipment5}
                />
              </ColListItem>
            </ColList>

            <ColList title="Shop">
              <ColListItem columns={shopFactColumns}>
                <ShopFact type="size" title="Size" value={shop.size} />
              </ColListItem>

              <ColListItem columns={shopFactColumns}>
                <ShopFact type="type" title="Type" value={shop.type} />
              </ColListItem>

              <ColListItem columns={shopFactColumns}>
                <ShopFact type="future" title="Outlook" value={shop.future} />
              </ColListItem>
            </ColList>

            <ColList title="Credibility Score" >
              <ColListItem columns={1}>
                <CredibilityScore mentions={shop.mentions} relationship={shop.relationship} />
              </ColListItem>
            </ColList>
          </CardText>
        </Card>
      </div>
    );
  }
}

ShopCard.propTypes = {
  shop: PropTypes.instanceOf(Shop),
  size: PropTypes.shape({
    width: PropTypes.number,
  }),
};

ShopCard.defaultProps = {
  shop: { shopname: 'Default shop' },
  size: { width: 1080 },
};

export default sizeMe()(ShopCard);
