import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { yellow700 } from 'material-ui/styles/colors';

import React from 'react';
import ShopSearch from './ShopSearch';

import './App.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: yellow700,
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
