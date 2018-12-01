import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import loginContainer from 'containers/loginContainer/loginContainer';
import walletConfirmContainer from 'containers/walletConfirmContainer/walletConfirmContainer';
import keystoreUploadContainer from 'containers/keystoreUploadContainer/keystoreUploadContainer';

class RoutesContainer extends PureComponent {

  render () {
    return (
      <Switch>
        <Route exact path="/login" component={loginContainer}/>
        <Route exact path="/create" component={walletConfirmContainer}/>
        <Route exact path="/unlock" component={keystoreUploadContainer}/>
        <Route path="/" component={loginContainer}/>
        <Redirect to="/404"/>
      </Switch>
    )
  }
}

export default RoutesContainer;