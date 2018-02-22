import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { yellow700, red400 } from 'material-ui/styles/colors';

import React from 'react';
import ShopSearch from './ShopSearch';

import './App.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: yellow700,
    secondary1Color: red400,
  },
});

const App = function renderApp() {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <ShopSearch />
    </MuiThemeProvider>
  );
};

export default App;
