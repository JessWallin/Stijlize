import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Frame from '../components/HomeScr';

const Routes = () => {
  console.log('Routes!');
  return (
    <Switch>
      <Route path="/" component={Frame} />
    </Switch>
  );
};

export default withRouter(Routes);
