import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import { yellow700, red400 } from 'material-ui/styles/colors';

import React from 'react';
import ShopSearch from './ShopSearch';

import './App.css';

const styles = {
  paperContainer: {
    width: '90%',
    margin: '1em auto',
    padding: '2em',
  },
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: yellow700,
    secondary1Color: red400,
  },
});

const App = function renderApp() {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Paper style={styles.paperContainer} zDepth={1} >
        <h1>Repair Shops of the World</h1>
        <p>Find a trustworthy camera repair shop near you. All data is provided by our users.</p>
        <ShopSearch />
      </Paper>
    </MuiThemeProvider>
  );
};

export default App;
