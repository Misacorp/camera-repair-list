import React from 'react';
import PropTypes from 'prop-types';

import Sadface from 'material-ui/svg-icons/social/sentiment-dissatisfied';

const styles = {
  container: {
    display: 'inline-block',
    marginBottom: '0.5em',
  },
  noData: {
    color: '#AAA',
  },
  icon: {
    verticalAlign: 'middle',
    color: '#AAA',
  },
  addSome: {
    marginLeft: '0.35em',
    color: '#000',
  },
};

function Contact(props) {
  const { children, country, shopname } = props;

  if (children === null || (typeof children === 'string' && children.length < 1)) {
    return (
      <div style={{ ...styles.container, ...styles.noData }}>
        No data <Sadface style={styles.icon} />
        <a
          href={`//cameraventures.com/repairraffle?shopname=${encodeURI(shopname)}&country=${encodeURI(country)}`}
          target="_blank"
          style={styles.addSome}
          onMouseUp={() => {
            // Get or create GTM data layer
            window.dataLayer = window.dataLayer || [];
            // Add event to data layer
            window.dataLayer.push({
              event: 'clickAddContact',
              shopname,
              country,
            });
          }}
        >
          Add some?
        </a>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {children}
    </div>
  );
}

Contact.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  country: PropTypes.string,
  shopname: PropTypes.string,
};

Contact.defaultProps = {
  children: null,
  country: '',
  shopname: '',
};

export default Contact;
