import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Layout } from 'antd';
import logo from 'assets/img/logo.png';

const { Content } = Layout;

class LoginContainer extends PureComponent {
  showWalletConfirm = () => {
    this.props.history.push('/create');
  }

  showWalletUnlock = () => {
    this.props.history.push('/unlock');
  }

  render() {
    return (
      <div className="block">
        <Layout>
          <Content className="main">
            <Row className="logo_area">
              <Col className="center" sm={{ span: 22, offset: 1 }}>
                <img alt="true" src={logo} className="logo" />
              </Col>
            </Row>
            <Row className="wallet_btn_area">
              <Col className="center" sm={{ span: 14, offset: 5 }} xs={{ span: 20, offset:2 }}>
                <h1>ECCoin Web Wallet</h1>
                <small>Create your own ECC wallet with your own private key!</small>
              </Col>
              <Col className="wallet_label center" sm={{ span: 12, offset: 6 }}>
                <span>Create or unlock a wallet</span>
              </Col>
              <Col className="center" sm={{ span: 14, offset: 5 }} xs={{ span: 20, offset:2 }}>
                <Button onClick={this.showWalletConfirm}>Create a new wallet</Button>
              </Col>
              <Col className="center" sm={{ span: 14, offset: 5 }} xs={{ span: 20, offset:2 }}>
                <Button onClick={this.showWalletUnlock}>Unlock existing wallet</Button>
              </Col>
              <Col className="center" sm={{ span: 14, offset: 5 }} xs={{ span: 20, offset:2 }}>
                <small>The private key is <strong>not</strong> leaving your computer!<br />
                The key is generated inside the browser.<br />
                Keep the password and the generated keyStore.json file safe!</small>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

LoginContainer.propTypes = {
  history: PropTypes.object,
};

LoginContainer.defaultProps = {
  history: PropTypes.object,
};

export default LoginContainer;
