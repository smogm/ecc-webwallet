import React, { PureComponent } from 'react'; 
import { Row, Col, Icon, Button, Input, Layout } from 'antd';
import logo from 'assets/img/logo.png';

const { Content, Header } = Layout;

class WalletConfirmContainer extends PureComponent {
  showWalletPage = () => {
    this.props.history.push('/wallet');
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
              <Row className="wallet_confirm_area">
                <Col className="wallet_confirm_label center" sm={{ span: 14, offset: 5 }} xs={{ span: 18, offset: 3 }}>
                  <span>Add a password to save your wallet</span>
                </Col>
                <Col className="wallet_password center" sm={{ span: 22, offset: 1 }} xs={{ span: 20, offset:2 }}>
                  <Input addonAfter={<Icon type="setting" />} addonBefore={<Icon type="setting" />} type="password" />
                </Col>
                <Col className="center" sm={{ span: 4, offset: 10 }} xs={{ span: 6, offset:8 }}>
                  <Button onClick={this.showWalletPage}>Save</Button>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }  
}

export default WalletConfirmContainer;