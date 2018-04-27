import React from 'react';
import PropTypes from 'prop-types';

import PeopleIcon from 'material-ui/svg-icons/social/people';
import PersonIcon from 'material-ui/svg-icons/social/person';

import AccountBalanceIcon from 'material-ui/svg-icons/action/account-balance';
import StoreIcon from 'material-ui/svg-icons/action/store';
import DomainIcon from 'material-ui/svg-icons/social/domain';

import VeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import Dissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import Neutral from 'material-ui/svg-icons/social/sentiment-neutral';
import Satisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import VerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';

const styles = {
  container: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  icon: {
    width: '50px',
    height: 'auto',
  },
  text: {
    display: 'block',
  },
};

const texts = [];

// Assign different sizes
texts.size = [
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
    icon: <AccountBalanceIcon style={styles.icon} />,
    text: 'Individual repairing in their spare time',
  },
  {
    icon: <StoreIcon style={styles.icon} />,
    text: 'Individual repairing full time',
  },
  {
    icon: <DomainIcon style={styles.icon} />,
    text: 'Registered company',
  },
];

// Assign different futures
texts.future = [
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

/**
 * Display quick facts about a shop; size, type and future.
 * Icon-led three-column layout that transforms on mobile.
 * @param {object} props React component props.
 * @param {string} props.type The type of fact to represent.
 * @param {string} props.value The raw numeric value for this property (as a string).
 */
function ShopFact(props) {
  const { type, value } = props;

  // Turn value into an array index by parsing it as an integer.
  const index = parseInt(value, 10) - 1;
  // Get the correct icon and text.
  const { icon, text } = texts[type][index];

  return (
    <div style={styles.container} >
      {icon}
      <div style={styles.text}>
        {text}
      </div>
    </div>
  );
}

export default ShopFact;

ShopFact.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
};

ShopFact.defaultProps = {
  type: '',
  value: '',
};
