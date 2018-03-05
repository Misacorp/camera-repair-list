import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';

function CredibilityScore(props) {
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
  let color = '#A8383B';
  if (score > 25) color = '#DC761E';
  if (score > 50) color = '#D4DB1E';
  if (score > 80) color = '#5B9632';

  return (
    <div>
      <LinearProgress
        mode="determinate"
        value={score}
        color={color}
        style={{ maxWidth: '100px' }}
      />
      <p>
        The credibility score is based on how many times this shop has been
        mentioned by users and how they have interacted with the shop. A low credibility score does
        not mean a shop is untrustworthy, just that we do not have enough data about it.
      </p>
    </div>
  );
}

CredibilityScore.propTypes = {
  mentions: PropTypes.number,
  relationship: PropTypes.number,
};

CredibilityScore.defaultProps = {
  mentions: 0,
  relationship: 0,
};

export default CredibilityScore;
