import React, { PureComponent } from 'react'; 
import { Row, Col, Button, Layout } from 'antd';
import logo from 'assets/img/logo.png';

const { Content, Header } = Layout;

class LoginContainer extends PureComponent {
  showWalletConfirm = () => {
    this.props.history.push('/create');
  }

  showWalletUnlock = () => {
    this.props.history.push('/unlock');
  }

  render () {
    return (
      <div className="block">
        <Layout>
          <Header className="header">
          </Header>
          <Layout>
            <Content className="main">
              <Row className="logo_area">
                <Col className="center" sm={{ span: 22, offset: 1 }}>
                  <img alt="true" src={logo} className="logo"/>
                </Col>
              </Row>
              <Row className="wallet_btn_area">
                <Col className="wallet_label center" sm={{ span: 12, offset: 6 }}>
                  <span>Create or unlock a wallet</span>
                </Col>
                <Col className="center" sm={{ span: 14, offset: 5 }} xs={{ span: 20, offset:2 }}>
                  <Button onClick={this.showWalletConfirm}>Create a new wallet</Button>
                </Col>
                <Col className="center" sm={{ span: 14, offset: 5 }} xs={{ span: 20, offset:2 }}>
                  <Button onClick={this.showWalletUnlock}>Unlock existing wallet</Button>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }  
}

export default LoginContainer;