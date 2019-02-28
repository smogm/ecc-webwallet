import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from 'core';
import { Row, Col, Layout } from 'antd';
import RoutesContainer from 'containers/RoutesContainer/RoutesContainer';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import PageNotFound from 'components/PageNotFound/PageNotFound';
import LoginContainer from 'containers/LoginContainer/LoginContainer';
import WalletConfirmContainer from 'containers/WalletConfirmContainer/WalletConfirmContainer';
import KeystoreUploadContainer from 'containers/KeystoreUploadContainer/KeystoreUploadContainer';

const { Content } = Layout;

class App extends Component {
  constructor() {
	super();

    this.gitRevision = 0;
	if (typeof process.env.GITREV !== undefined) {
	  this.gitRevision = process.env.GITREV;
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
              <Layout>
                <Content>
                  <Row>
                    <Col className="center" sm={{ span: 22, offset: 1 }}>
                      <small>v. 1.0-{this.gitRevision}</small>
                    </Col>
                  </Row>
                </Content>
              </Layout>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
