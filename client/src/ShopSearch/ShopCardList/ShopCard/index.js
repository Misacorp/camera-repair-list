import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

import Avatar from 'material-ui/Avatar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import RaisedButton from 'material-ui/RaisedButton';
import GlobeIcon from 'material-ui/svg-icons/social/public';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';

import ColList from '../../ColList/';
import ColListItem from '../../ColList/ColListItem';
import ConditionalText from './ConditionalText';
import Contact from './Contact';
import DataAccuracy from './DataAccuracy';
import Shop from '../../Shop';
import ShopFact from './ShopFact';

import flagFetcher from './flagFetcher';
import loadingIcon from '../../../assets/img/ic_image_white_24px.svg';

const styles = {
  cardContainer: {
    paddingBottom: 0,
  },
  card: {
    general: {
      transition: 'background-color 0.2s ease-out',
    },
    expanded: {
      header: {
        backgroundColor: '#000',
      },
      text: {
        color: '#FFF',
      },
    },
    closed: {
      header: {
        backgroundColor: 'initial',
      },
      text: {
        color: 'initial',
      },
    },
  },
  cardActions: {
    textAlign: 'center',
  },
  icon: {
    verticalAlign: 'middle',
    paddingRight: '1em',
  },
  cardText: {
    backgroundColor: '#FCFCFC',
    // boxShadow: 'inset 0px 0px 5px 3px rgba(0, 0, 0, 0.15)',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 10px 0px inset',
  },
  avatar: {
    overflow: 'hidden',
    boxShadow: '2px 2px 3px rgba(0,0,0,0.3)',
  },
  avatarImage: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
  },
  link: {
    color: '#000',
  },
};

class ShopCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flagImage: loadingIcon,
      expanded: false,
    };
    this.handleExpand = this.handleExpand.bind(this);
    this.updateDataLayer = this.updateDataLayer.bind(this);
  }

  /**
   * Get country flags
   */
  componentWillMount() {
    flagFetcher.getFlag(this.props.shop.country)
      .then((countryFlagURL) => {
        this.setState({
          flagImage: countryFlagURL,
        });
      })
      .catch(() => {
      });
  }


  /**
   * Handle expansion of a ShopCard
   * @param {boolean} expanded New expanded state of the card.
   */
  handleExpand(expanded) {
    // Expand card
    this.setState({ expanded });

    // Build an event name for GTM's data layer
    let eventName = 'shrinkShop';
    if (expanded) {
      eventName = 'expandShop';
    }

    // Push event to dataLayer
    this.updateDataLayer(eventName);
  }


  /**
   * Notify Tag Manager that this card was expanded
   * @param {string} eventName Name of event to fire
   */
  updateDataLayer(eventName) {
    // Send an event name if one was provided
    let event = null;
    if (typeof eventName === 'string' && eventName.length > 0) event = eventName;

    const data = {
      event,
      shopname: this.props.shop.shopname,
      country: this.props.shop.country,
    };

    window.dataLayer.push(data);
  }


  render() {
    const { shop } = this.props;

    // Get or create GTM data layer
    window.dataLayer = window.dataLayer || [];

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
    let subtitle = shop.country;
    if (shop.address) {
      subtitle = `${shop.address}, ${subtitle}`;
    }

    // Get expanded and closed styles
    const { expanded, closed } = styles.card;

    return (
      <div>
        <Card
          key={shop.shopname}
          containerStyle={styles.cardContainer}
          onExpandChange={this.handleExpand}
        >
          <CardHeader
            title={shop.shopname}
            subtitle={subtitle}
            actAsExpander
            showExpandableButton
            style={this.state.expanded ?
              { ...styles.card.general, ...expanded.header } :
              { ...styles.card.general, ...closed.header }
            }
            titleColor={this.state.expanded ? expanded.text.color : closed.text.color}
            subtitleColor={this.state.expanded ? expanded.text.color : closed.text.color}
            iconStyle={this.state.expanded ? expanded.text : closed.text}
            avatar={
              <Avatar
                style={styles.avatar}
              >
                <div style={{ ...styles.avatarImage, backgroundImage: `url(${this.state.flagImage})` }} />
              </Avatar>
            }
          />
          <CardText
            expandable
            style={styles.cardText}
          >
            <ColList title="Contact" >
              <ColListItem columns={contactColumns}>
                <EmailIcon style={styles.icon} />
                <Contact shopname={shop.shopname} country={shop.country}>
                  {shop.email}
                </Contact>
              </ColListItem>
              <ColListItem columns={contactColumns}>
                <GlobeIcon style={styles.icon} />
                <Contact shopname={shop.shopname} country={shop.country}>
                  {shop.website ?
                    <a
                      href={`//${shop.website}`}
                      style={styles.link}
                      target="_blank"
                      onMouseUp={() => this.updateDataLayer('clickWebsite')}
                    >
                      {shop.website}
                    </a> :
                  null }
                </Contact>
              </ColListItem>
              {shop.phone ?
                <ColListItem columns={contactColumns}>
                  <PhoneIcon style={styles.icon} />
                  <Contact shopname={shop.shopname} country={shop.country}>
                    {shop.phone}
                  </Contact>
                </ColListItem> :
                null
              }
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
                <ShopFact
                  type="size"
                  title="Size"
                  value={shop.size}
                  smallScreen={shopFactColumns === 1}
                />
              </ColListItem>

              <ColListItem columns={shopFactColumns}>
                <ShopFact
                  type="type"
                  title="Type"
                  value={shop.type}
                  smallScreen={shopFactColumns === 1}
                />
              </ColListItem>

              <ColListItem columns={shopFactColumns}>
                <ShopFact
                  type="future"
                  title="Outlook"
                  value={shop.future}
                  smallScreen={shopFactColumns === 1}
                />
              </ColListItem>
            </ColList>

            <ColList title="Data Accuracy" >
              <ColListItem columns={1}>
                <DataAccuracy dataAccuracy={shop.dataAccuracy} />
                <RaisedButton
                  label="Submit more data"
                  primary
                  target="_blank"
                  href={`https://camerarescue.org/repaircenters?shop-name=${encodeURI(shop.shopname)}&country=${encodeURI(shop.country)}#addshop`}
                  onMouseUp={() => this.updateDataLayer('clickSubmitData')}
                />
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
