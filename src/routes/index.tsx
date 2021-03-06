import { Switch, Route } from 'react-router-dom';

import React from 'react';
import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <Dashboard />
    </Route>
    <Route path="/repository/:repository+">
      <Repository />
    </Route>
  </Switch>
);

export default Routes;
