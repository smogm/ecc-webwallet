import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from 'core';
import RoutesContainer from 'containers/RoutesContainer/RoutesContainer';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import PageNotFound from 'components/PageNotFound/PageNotFound';
import LoginContainer from 'containers/LoginContainer/LoginContainer';
import WalletConfirmContainer from 'containers/WalletConfirmContainer/WalletConfirmContainer';
import KeystoreUploadContainer from 'containers/KeystoreUploadContainer/KeystoreUploadContainer';
//import 'css/App.less';
//import 'css/index.css';

class App extends Component {
  constructor() {
    this.version = 0;
	if (typeof COMMIT_SHA !== undefined) {
	  this.version = COMMIT_SHA;
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="content">
              <Switch>
                <Route path="/login" exact component={LoginContainer} />
                <Route exact path="/create" component={WalletConfirmContainer} />
                <Route exact path="/unlock" component={KeystoreUploadContainer} />
                <Route exact path="/404" component={PageNotFound} />
                <PrivateRoute path="/" component={RoutesContainer} />
              </Switch>
              <div>V. {this.version}</div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
