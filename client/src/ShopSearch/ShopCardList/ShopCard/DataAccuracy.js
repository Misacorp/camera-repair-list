import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';


const styles = {
  progress: {
    maxWidth: '150px',
    backgroundColor: '#DDD',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  accuracyScore: {
    marginLeft: '1em',
  },
};


/**
 * Calculate a data accuracy score and display it
 * @param {object} props React props
 * @param {number} props.dataAccuracy Accuracy number on a scale from 1 to 10.
 */
function DataAccuracy(props) {
  const score = props.dataAccuracy * 10;

  return (
    <div>
      <div>
        <LinearProgress
          mode="determinate"
          value={score}
          color="#000"
          style={styles.progress}
        />
        <span style={styles.accuracyScore}>{props.dataAccuracy}/10</span>
      </div>
      <p>
        Data accuracy reflects the reliability
        of our information regarding this shop. The higher the score, the more users have
        contributed to this shop&#39;s data.
      </p>
    </div>
  );
}

DataAccuracy.propTypes = {
  dataAccuracy: PropTypes.number,
};

DataAccuracy.defaultProps = {
  dataAccuracy: 0,
};

export default DataAccuracy;
