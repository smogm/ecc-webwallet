import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connectWallet, walletActionCreators } from 'core';
import { Row, Col, Input, Icon, Button, Layout } from 'antd';
import { promisify } from '../../../utilities';

const { Content } = Layout;

class SendContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      feeAmount: '1.200',
    };
  }

  componentDidMount() {
    const { wallet } = this.props;
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
  }

  render() {
    const { wallet } = this.props;

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
                  <span>
                    { wallet.balance ? wallet.balance : 0 }
                    BITG
                  </span>
                </Col>
                <Col className="send_to" sm={{ span: 18, offset: 3 }}>
                  <Input addonBefore={<span>To:</span>} addonAfter={<Icon type="setting" />} type="text" />
                </Col>
                <Col className="send_amount" sm={{ span: 18, offset: 3 }}>
                  <Input addonBefore={<span>Amount:</span>} addonAfter={<Icon type="setting" />} type="text" />
                </Col>
                <Col className="send_fee_area" sm={{ span: 18, offset: 3 }}>
                  <Row>
                    <Col className="send_fee" sm={{ span: 12 }} xs={{ span: 12 }}>
                      <span>Fee</span>
                    </Col>
                    <Col className="send_fee_amout" sm={{ span: 12 }} xs={{ span: 12 }}>
                      <span>
                        <Icon type="caret-up" />
                        {this.state.feeAmount}
                      </span>
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

SendContainer.propTypes = {
  wallet: PropTypes.object,
  getBalance: PropTypes.func,
  getUtxos: PropTypes.func,
};

SendContainer.defaultProps = {
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
)(SendContainer);
