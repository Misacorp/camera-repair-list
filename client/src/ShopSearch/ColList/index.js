import React from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import ColListItem from './ColListItem';

const styles = {
  colList: {
    marginBottom: '1.5em',
  },
  content: {
    paddingLeft: '16px',
  },
  subHeader: {
    textTransform: 'uppercase',
    fontWeight: '600',
    color: '#C0C0C0',
  },
};

function ColList(props) {
  return (
    <div style={styles.colList}>
      <Subheader style={styles.subHeader}>{props.title}</Subheader>
      <div style={styles.content}>
        {props.children}
      </div>
    </div>
  );
}

ColList.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ColList.defaultProps = {
  title: 'Default title',
  children: <ColListItem>Default Children</ColListItem>,
};

export default ColList;
