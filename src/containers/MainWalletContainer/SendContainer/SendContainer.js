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
      addressTo: '',
      txValue: '',
      feeAmount: '1.200', //  ToDo: feeAmount will replace with real value after getting fee from api
      errMsg: '',
    };
  }

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
      const txUtxos = [];
      let txUtxoValue = 0;

      for (let i = 0; i < wallet.utxos.length; i += 1) {
        txUtxos.push(wallet.utxos[i]);
        txUtxoValue += wallet.utxos[i].value;
        if (txUtxoValue > this.state.txValue) {
          this.processTransaction(txUtxos);
          break;
        }
      }
    }
  }

  processTransaction = txUtxos => {
    console.log('txUtxos', txUtxos);
  }

  render() {
    const { wallet } = this.props;

    return (
      <div className="block">
        <Layout>
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
                    <Input addonBefore={<span>To:</span>} onChange={evt => this.onChangeData('addressTo', evt)} addonAfter={<Icon type="setting" />} type="text" />
                  </Col>
                  <Col className="send_amount" sm={{ span: 18, offset: 3 }}>
                    <Input addonBefore={<span>Amount:</span>} onChange={evt => this.onChangeData('amount', evt)} addonAfter={<Icon type="setting" />} type="number" />
                  </Col>
                  {
                    this.state.errMsg !== '' ? (
                      <Col className="invalid_msg" sm={{ span: 18, offset: 3 }}>
                        <span>{this.state.errMsg}</span>
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
                          {this.state.feeAmount}
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
