import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Frame from '../components/HomeScr';
import About from '../components/about';

const Routes = () => {
  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/" component={Frame} />
    </Switch>
  );
};

export default withRouter(Routes);
