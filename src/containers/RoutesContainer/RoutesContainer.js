import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import loginContainer from 'containers/loginContainer/loginContainer';
import walletConfirmContainer from 'containers/walletConfirmContainer/walletConfirmContainer';

class RoutesContainer extends PureComponent {

  render () {
    return (
      <Switch>
        <Route exact path="/login" component={loginContainer}/>
        <Route exact path="/confirm" component={walletConfirmContainer}/>
        <Route path="/" component={loginContainer}/>
        <Redirect to="/404"/>
      </Switch>
    )
  }
}

export default RoutesContainer;