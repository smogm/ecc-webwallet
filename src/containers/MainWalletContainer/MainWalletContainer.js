import React, { PureComponent } from 'react';
import { Row, Col, Button, Layout } from 'antd';
import ReceiveContainer from './ReceiveContainer/ReceiveContainer';
import SendContainer from './SendContainer/SendContainer';

const { Content } = Layout;

class mainWalletContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      containerType: 'receive',
    };
  }

  showWalletContent = containerType => {
    this.setState({ containerType });
  }

  render() {
    return (
      <div className="block">
        <Layout>
          <Layout>
            <Content className="main">
              <div className="main_wallet_area">
                <Row className="main_wallet_label">
                  <Col className="center">
                    <span>Receive your funds</span>
                  </Col>
                </Row>
                <Row className="main_wallet_btn">
                  <Col className="receive_btn" sm={{ span: 12 }} xs={{ span: 12 }}>
                    <Button className={this.state.containerType === 'receive' ? 'selected' : null} icon="qrcode" onClick={() => this.showWalletContent('receive')}>Receive</Button>
                  </Col>
                  <Col className="send_btn" sm={{ span: 12 }} xs={{ span: 12 }}>
                    <Button className={this.state.containerType === 'send' ? 'selected' : null} onClick={() => this.showWalletContent('send')}>Send</Button>
                  </Col>
                </Row>
                <Row className="main_wallet_container">
                  {
                    this.state.containerType === 'receive' ? (<ReceiveContainer />) : (<SendContainer />)
                  }
                </Row>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default mainWalletContainer;
