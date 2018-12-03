import React, { PureComponent } from 'react'; 
import { Row, Col, Input, Icon, Button, Layout } from 'antd';

const { Content} = Layout;

class SendContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bitgBalance: '333.121',
      feeAmount: '1.200'
    }
  }

  render () {
    return (
      <div className="block">
        <Layout>
          <Layout>
            <Content className="main">
              <Row className="send_area">
                <Col className="send_label center">
                  <span>Available Balance</span>
                </Col>
                <Col className="send_balance_label center">
                  <span>{this.state.bitgBalance} BITG</span>
                </Col>
                <Col className="send_to" sm={{ span: 18, offset: 3 }}>
                  <Input addonBefore={<span>To:</span>} addonAfter={<Icon type="setting" />} type="text" />
                </Col>
                <Col className="send_amount" sm={{ span: 18, offset: 3 }}>
                  <Input addonBefore={<span>Amount:</span>} addonAfter={<span></span>} type="text" />
                </Col>
                <Col className="send_fee_area" sm={{ span: 18, offset: 3 }}>
                  <Row>
                    <Col className="send_fee" sm={{ span: 12 }} xs={{ span: 12 }}>
                      <span>Fee</span>
                    </Col>
                    <Col className="send_fee_amout" sm={{ span: 12 }} xs={{ span: 12 }}>
                      <span><Icon type="caret-up" />{this.state.feeAmount}</span>
                    </Col>
                  </Row>
                </Col>
                <Col className="submit_transaction center" sm={{ span: 18, offset: 3 }}>
                  <Button>Submit Transaction</Button>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }  
}

export default SendContainer;