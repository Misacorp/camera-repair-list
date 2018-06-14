import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ShopSearch from './ShopSearch';
import './App.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#000000',
    secondary1Color: '#000000',
  },
  fontFamily: 'Montserrat, Helvetica Neue, Roboto, Arial, sans',
});

const styles = {
  app: {
    fontSize: '16px',
  },
};

function App() {
  return (
    <div style={styles.app} >
      <MuiThemeProvider muiTheme={muiTheme}>
        <ShopSearch />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
