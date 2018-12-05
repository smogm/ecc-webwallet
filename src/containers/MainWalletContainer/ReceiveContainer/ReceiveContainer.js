import React, { PureComponent } from 'react'; 
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connectWallet, walletActionCreators } from 'core';
import { promisify } from '../../../utilities';
import { Row, Col, Input, Icon, Button, Layout } from 'antd';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const { Content} = Layout;

class ReceiveContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    }
  }

  componentDidMount() {
    const { wallet } = this.props;
    promisify(this.props.getBalance, {
      address: wallet.address
    })
      .then((res) => {
      })
      .catch(e => console.log(e));
  }

  render () {
    const { wallet } = this.props;

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
                  <span>{wallet.balance ? wallet.balance : 0} BITG</span>
                </Col>
                <Col className="receive_qrcode center">
                  <QRCode value={wallet.address ? wallet.address : ''}/>
                </Col>
                <Col className="receive_address_area" sm={{ span: 20, offset: 2 }}>
                  <Row className="clipboard_cpy_area">
                    <Col className="receive_address" sm={{ span: 18 }} xs={{ span: 16}}>
                      <Input value={wallet.address ? wallet.address : ''} readOnly/>
                    </Col>
                    <Col sm={{ span: 6 }} xs={{ span: 8}}>
                      <CopyToClipboard text={wallet.address ? wallet.address : ''} onCopy={() => this.setState({copied: true})}>
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

const mapStateToProps = ({wallet}) => ({
  wallet: wallet
});

const mapDisptachToProps = (dispatch) => {
  const {
    getBalance
  } = walletActionCreators

  return bindActionCreators({
    getBalance
  }, dispatch);
}

export default compose(
  connectWallet(mapStateToProps, mapDisptachToProps),
)(ReceiveContainer);