import React from 'react';
import PropTypes from 'prop-types';

import PeopleIcon from 'material-ui/svg-icons/social/people';
import PersonIcon from 'material-ui/svg-icons/social/person';

import IndividualSpareTimeIcon from 'material-ui/svg-icons/action/face';
import IndividualFullTimeIcon from 'material-ui/svg-icons/action/store';
import RegisteredCompanyIcon from 'material-ui/svg-icons/communication/business';

import VeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import Dissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import Neutral from 'material-ui/svg-icons/social/sentiment-neutral';
import Satisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import VerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';

import ReportIcon from 'material-ui/svg-icons/content/report';

const defaultStyles = {
  container: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    position: 'relative',
  },
  icon: {
    width: '50px',
    height: 'auto',
    verticalAlign: 'middle',
  },
  badIcon: {
    color: '#AAA',
  },
  content: {
    container: {
      display: 'block',
      textAlign: 'center',
    },
    text: {
      display: 'block',
    },
    title: {
      margin: 0,
      marginBottom: '0.5em',
    },
  },
  tooltip: {
    display: 'table',
    position: 'absolute',
    top: '-100%',
    left: '50%',

    padding: '1em',
    borderRadius: '4px',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 4px 2px',

    textAlign: 'left',

    color: '#AAA',
    backgroundColor: '#FFF',

    opacity: 1,
    transform: 'translate(-50%, 0)',

    transitionProperty: 'opacity, transform',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-out',

    pointerEvents: 'none',
  },
  tooltipChild: {
    display: 'table-row',
  },
  tooltipHidden: {
    opacity: 0,
    transform: 'translate(-50%, 10%)',
  },
  selected: {
    color: 'initial',
  },
};


/**
 * Display quick facts about a shop; size, type and future.
 * Icon-led three-column layout that transforms on mobile.
 * @param {object} props React component props.
 * @param {string} props.type The type of fact to represent.
 * @param {string} props.value The raw numeric value for this property (as a string).
 */
class ShopFact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false,
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }


  /**
   * Handle focus of a ShopFact
   */
  handleFocus() {
    this.setState({ tooltipOpen: true });
  }


  /**
   * Handle blur of a ShopFact
   */
  handleBlur() {
    this.setState({ tooltipOpen: false });
  }


  render() {
    const {
      type,
      title,
      value,
      smallScreen,
    } = this.props;

    // Set styles if viewed on a small screen
    let styles = defaultStyles;
    if (smallScreen) {
      styles = {
        ...styles,
        container: {
          ...styles.container,
          textAlign: 'left',
          marginBottom: '0.5em',
        },
        icon: {
          ...styles.icon,
          verticalAlign: 'middle',
        },
        content: {
          container: {
            display: 'inline-block',
            verticalAlign: 'middle',
            marginLeft: '1em',
          },
          title: {
            ...styles.content.title,
            margin: 0,
          },
        },
      };
    }


    // List of content that can be displayed.
    const texts = [];

    // Assign different sizes
    texts.size = [
      {
        icon: <ReportIcon style={{ ...styles.icon, ...styles.badIcon }} />,
        text: 'Unknown or bad data',
      },
      {
        icon: <PersonIcon style={styles.icon} />,
        text: 'One technician',
      },
      {
        icon: <PeopleIcon style={styles.icon} />,
        text: '2-3 technicians',
      },
      {
        icon: <PeopleIcon style={styles.icon} />,
        text: '4-7 technicians',
      },
      {
        icon: <PeopleIcon style={styles.icon} />,
        text: 'Over 8 technicians',
      },
    ];

    // Assign different types
    texts.type = [
      {
        icon: <ReportIcon style={{ ...styles.icon, ...styles.badIcon }} />,
        text: 'Unknown or bad data',
      },
      {
        icon: <IndividualSpareTimeIcon style={styles.icon} />,
        text: 'Individual repairing in their spare time',
      },
      {
        icon: <IndividualFullTimeIcon style={styles.icon} />,
        text: 'Individual repairing full time',
      },
      {
        icon: <RegisteredCompanyIcon style={styles.icon} />,
        text: 'Registered company',
      },
    ];

    // Assign different futures
    texts.future = [
      {
        icon: <ReportIcon style={{ ...styles.icon, ...styles.badIcon }} />,
        text: 'Unknown or bad data',
      },
      {
        icon: <VeryDissatisfied style={styles.icon} />,
        text: 'Future sucks',
      },
      {
        icon: <Dissatisfied style={styles.icon} />,
        text: 'Future is bad',
      },
      {
        icon: <Neutral style={styles.icon} />,
        text: 'Future is ok',
      },
      {
        icon: <Satisfied style={styles.icon} />,
        text: 'Future is good',
      },
      {
        icon: <VerySatisfied style={styles.icon} />,
        text: 'Future is great',
      },
    ];


    // Get the correct icon and text.
    const { icon, text } = texts[type][value];

    // Create a tooltip component that shows all possible options for this fact.
    // Set some styles
    const style = styles.tooltipChild;
    const selectedStyle = {
      ...styles.selected,
      ...styles.tooltipChild,
    };

    // Create actual tooltip
    const tooltip = (
      <div style={this.state.tooltipOpen ?
        styles.tooltip :
        { ...styles.tooltip, ...styles.tooltipHidden }}
      >
        {texts[type].map((item, i) => {
          if (i === 0) return null;
          return (
            <div
              key={item.text}
              style={value === i ? selectedStyle : style}
            >
              {item.text}
            </div>
          );
          })}
      </div>
    );

    return (
      <div
        style={styles.container}
        onMouseEnter={this.handleFocus}
        onFocus={this.handleFocus}
        onMouseLeave={this.handleBlur}
        onBlur={this.handleBlur}
      >
        {tooltip}
        {icon}
        <div style={styles.content.container}>
          <h4 style={styles.content.title}>{title}</h4>
          <div style={styles.content.text}>
            {text}
          </div>
        </div>
      </div>
    );
  }
}

ShopFact.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.number,
  smallScreen: PropTypes.bool,
};

ShopFact.defaultProps = {
  type: 'type',
  title: 'title',
  value: 0,
  smallScreen: true,
};

export default ShopFact;
