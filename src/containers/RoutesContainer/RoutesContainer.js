import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginContainer from 'containers/LoginContainer/LoginContainer';
import MainWalletContainer from 'containers/MainWalletContainer/MainWalletContainer';

class RoutesContainer extends PureComponent {

  render () {
    return (
      <Switch>
        <Route exact path="/login" component={LoginContainer}/>
        <Route exact path="/wallet" component={MainWalletContainer}/>
        <Route path="/" component={LoginContainer}/>
        <Redirect to="/404"/>
      </Switch>
    )
  }
}

export default RoutesContainer;