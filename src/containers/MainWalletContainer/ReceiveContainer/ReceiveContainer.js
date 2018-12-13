import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connectWallet, walletActionCreators } from 'core';
import { Row, Col, Input, Icon, Button, Layout } from 'antd';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { promisify } from '../../../utilities';

const { Content } = Layout;

class ReceiveContainer extends PureComponent {
  componentDidMount() {
    const { wallet } = this.props;
    setTimeout(() => {
      promisify(this.props.getBalance, {
        address: wallet.address,
      })
        .then(() => {
        })
        .catch(e => console.log(e));

      setTimeout(() => {
        promisify(this.props.getUtxos, {
          address: wallet.address,
        })
          .then(() => {
          })
          .catch(e => console.log(e));
      }, 1000);
    }, 1000);
  }

  render() {
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
                  <span>
                    { wallet.balance ? wallet.balance : 0 }
                    BITG
                  </span>
                </Col>
                <Col className="receive_qrcode center">
                  <QRCode value={wallet.address ? wallet.address : ''} />
                </Col>
                <Col className="receive_address_area" sm={{ span: 20, offset: 2 }}>
                  <Row className="clipboard_cpy_area">
                    <Col className="receive_address" sm={{ span: 18 }} xs={{ span: 16 }}>
                      <Input value={wallet.address ? wallet.address : ''} readOnly />
                    </Col>
                    <Col sm={{ span: 6 }} xs={{ span: 8 }}>
                      <CopyToClipboard text={wallet.address ? wallet.address : ''}>
                        <Button className="address_copy_btn">
                          Copy
                          <Icon type="copy" />
                        </Button>
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
ReceiveContainer.propTypes = {
  wallet: PropTypes.object,
  getBalance: PropTypes.func,
  getUtxos: PropTypes.func,
};

ReceiveContainer.defaultProps = {
  wallet: PropTypes.object,
  getBalance: PropTypes.func,
  getUtxos: PropTypes.func,
};

const mapStateToProps = ({ wallet }) => ({
  wallet,
});

const mapDisptachToProps = dispatch => {
  const {
    getBalance,
    getUtxos,
  } = walletActionCreators;

  return bindActionCreators({
    getBalance,
    getUtxos,
  }, dispatch);
};

export default compose(
  connectWallet(mapStateToProps, mapDisptachToProps),
)(ReceiveContainer);
