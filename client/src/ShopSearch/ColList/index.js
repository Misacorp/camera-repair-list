import React from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import ColListItem from './ColListItem';
import InlineText from '../InlineText';

function ColList(props) {
  return (
    <div>
      <Subheader>{props.title}</Subheader>
      <div style={{ paddingLeft: '16px' }}>
        {props.items.map(item => (
          <ColListItem key={item.content} content={item} />
        ))}
      </div>
    </div>
  );
}

ColList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(InlineText),
};

ColList.defaultProps = {
  title: 'Default title',
  items: [],
};

export default ColList;
