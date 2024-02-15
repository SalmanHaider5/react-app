import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../Components/Login';
import Dashboard from '../Components/Dashboard';
import Subscriptions from '../Components/Dashboard/Subscriptions';
import Magazines from '../Components/Dashboard/Magazines';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />}>
            <Route path="/magazines" exact element={<Magazines />} />
            <Route path="/subscriptions" exact element={<Subscriptions />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Switch>
    </Router>
  );
}

export default Routes;