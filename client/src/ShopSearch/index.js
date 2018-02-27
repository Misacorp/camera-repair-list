import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import ShopCardList from './ShopCardList';

const styles = {
  paperContainer: {
    width: '80%',
    margin: '1em auto',
  },
  shopCardList: {
    textAlign: 'center',
  },
};

function ShopSearch(props) {
  return (
    <div>
      <Paper style={styles.paperContainer} zDepth={1} >
        <ShopCardList source={props.source} />
      </Paper>
    </div>
  );
}

ShopSearch.propTypes = {
  source: PropTypes.string,
};

ShopSearch.defaultProps = {
  source: 'https://api.cameramakers.com/production',
};

export default ShopSearch;
