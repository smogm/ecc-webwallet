import React, { PureComponent } from 'react'; 
import { Row, Col, Input, Icon, Button, Layout } from 'antd';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const { Content} = Layout;

class ReceiveContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bitgBalance: 333.121,
      address: 'GTsqojGaG2sy4uUTwyqwjxDtaVaF9ja5DV',
      copied: false
    }
  }

  render () {
    return (
      <div className="block">
        <Layout>
          <Layout>
            <Content className="main">
              <Row className="receive_area">
                <Col className="receive_label center">
                  <span>Available Balance</span>
                </Col>
                <Col className="receive_balance_label center">
                  <span>{this.state.bitgBalance} BITG</span>
                </Col>
                <Col className="receive_qrcode center">
                  <QRCode value={this.state.address}/>
                </Col>
                <Col className="receive_address_area" sm={{ span: 18, offset: 3 }}>
                  <Row className="clipboard_cpy">
                    <Col sm={{ span: 18 }} xs={{ span: 16}}>
                      <Input value={this.state.address} readOnly/>
                    </Col>
                    <Col sm={{ span: 6 }} xs={{ span: 8}}>
                      <CopyToClipboard text={this.state.address} onCopy={() => this.setState({copied: true})}>
                        <Button className="address_copy_btn">Copy <Icon type="copy"/></Button>
                      </CopyToClipboard>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }  
}

export default ReceiveContainer;