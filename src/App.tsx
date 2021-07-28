import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Fragment } from 'react';

import { GlobalStyle } from './styles/global';
import Routes from './routes';

const App: React.FC = () => (
  <Fragment>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyle />
  </Fragment>
);

export default App;
