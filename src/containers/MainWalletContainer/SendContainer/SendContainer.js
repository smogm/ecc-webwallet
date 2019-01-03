import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connectWallet, walletActionCreators } from 'core';
import { Row, Col, Input, Icon, Button, Layout } from 'antd';
import { setTransaction, submitTransaction } from '../../../services/lib/bitcoingreen-lib';
import { promisify } from '../../../utilities';
import { config } from '../../../config';

const { Content } = Layout;

class SendContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addressTo: '',
      txValue: '',
      errMsg: '',
      txStatus: 'pending',
      txHash: '',
    };
  }

  onChangeData = (type, evt) => {
    switch (type) {
      case 'addressTo':
        this.setState({ addressTo: evt.target.value });
        break;
      case 'amount':
        this.setState({ txValue: evt.target.value });
        break;
      default:
        this.setState({ addressTo: '' });
        this.setState({ txValue: '' });
        break;
    }
  }

  submitTransaction = e => {
    e.preventDefault();
    const { wallet } = this.props;
    if (this.state.addressTo === '' || this.state.txValue === '' || +this.state.txValue === 0) {
      this.setState({ errMsg: 'All fields are required.' });
      return;
    }

    if (this.state.txValue > wallet.balance) {
      this.setState({ errMsg: 'Insufficient Funds' });
    } else {
      this.setState({ errMsg: '' });

      promisify(this.props.getUtxos, {
        address: wallet.address,
      })
        .then(() => {
          const txUtxos = [];
          let txUtxoValue = 0;
          const { wallet } = this.props;

          for (let i = 0; i < wallet.utxos.length; i += 1) {
            txUtxos.push(wallet.utxos[i]);
            txUtxoValue += +wallet.utxos[i].value;
            if (txUtxoValue > this.state.txValue) {
              this.processTransaction(txUtxos, txUtxoValue, this.state.txValue);
              break;
            }
          }
        })
        .catch(err => {
          this.setState({ errMsg: err.message ? err.message : 'Invalid address' });
        });
    }
  }

  processTransaction = (txUtxos, txUtxoValue, amount) => {
    const { wallet } = this.props;
    const rawTransaction = setTransaction(txUtxos, txUtxoValue, amount, this.state.addressTo, wallet.address, wallet.privateKey);
    submitTransaction(rawTransaction)
    .then(res => {
      if (res.status === 200) {
        this.setState({ txStatus: 'success', txHash: res.data.data });
        setTimeout(() => {
          this.setState({ txStatus: 'pending', txHash: '' });
        }, 1000 * 20);
      } else {
        this.setState({ txStatus: 'fail', errMsg: res.data.message });
      }
    })
    .catch(err => {
      this.setState({ txStatus: 'fail', errMsg: err.message ? err.message : '' });
    });
  }

  render() {
    const { wallet } = this.props;

    return (
      <div className="block">
        <Layout>
          <Content className="main">
            <Row className="send_area">
              <form onSubmit={this.submitTransaction}>
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
                  <Input addonBefore={<span>To:</span>} onChange={evt => this.onChangeData('addressTo', evt)} type="text" />
                </Col>
                <Col className="send_amount" sm={{ span: 18, offset: 3 }}>
                  <Input addonBefore={<span>Amount:</span>} onChange={evt => this.onChangeData('amount', evt)} type="number" />
                </Col>
                {
                  this.state.errMsg !== '' ? (
                    <Col className="invalid_msg" sm={{ span: 18, offset: 3 }}>
                      <span>{this.state.errMsg}</span>
                    </Col>
                  ) : null
                }
                {
                  this.state.txStatus === 'success' ? (
                    <Col className="tx_send_success success_msg" sm={{ span: 18, offset: 3 }}>
                      <p>
                        Tx Hash:
                      </p>
                      <p>
                        {this.state.txHash}
                      </p>
                    </Col>
                  ) : null
                }
                <Col className="send_fee_area" sm={{ span: 18, offset: 3 }}>
                  <Row>
                    <Col className="send_fee" sm={{ span: 12 }} xs={{ span: 12 }}>
                      <span>Fee</span>
                    </Col>
                    <Col className="send_fee_amout" sm={{ span: 12 }} xs={{ span: 12 }}>
                      <span>
                        <Icon type="caret-up" />
                        {config.FEE_AMOUNT}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col className="submit_transaction center" sm={{ span: 18, offset: 3 }}>
                  <Button onClick={this.submitTransaction}>Submit Transaction</Button>
                </Col>
              </form>
            </Row>
          </Content>
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
