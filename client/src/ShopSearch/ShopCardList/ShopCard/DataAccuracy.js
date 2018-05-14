import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';

function DataAccuracy(props) {
  // Control mentions required for maximum score from it.
  const MAXMENTIONS = 50;
  const { mentions, relationship } = props;

  /**
   * Relationship score values:
   * 1: "I have used their services"
   * 2: "Someone I know has used their services"
   * 3: "I have learned about them online"
   */

  // 73% of score is how many times a shop has been mentioned.
  let score = Math.min(mentions / MAXMENTIONS, 1) * 0.73;
  // Remaining 27% is based on the mode relationship value.
  score += 0.27 / relationship;
  score = Math.min(score, 1);
  // Multiply into a percentage
  score *= 100;

  // Set color based on score
  const color = '#5BCF32';
  // let color = '#A8383B';
  // if (score > 25) color = '#DC761E';
  // if (score > 50) color = '#D4DB1E';
  // if (score > 80) color = '#5B9632';

  return (
    <div>
      <LinearProgress
        mode="determinate"
        value={score}
        color={color}
        style={{ maxWidth: '100px', backgroundColor: '#DDD' }}
      />
      <p>
        Data accuracy reflects the reliability of our information regarding this shop.
        The higher the score, the more users have contributed to this shop&#39;s data.
      </p>
    </div>
  );
}

DataAccuracy.propTypes = {
  mentions: PropTypes.number,
  relationship: PropTypes.number,
};

DataAccuracy.defaultProps = {
  mentions: 0,
  relationship: 0,
};

export default DataAccuracy;
