import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { Row, Col, Icon, Button, Input, Layout } from 'antd';
import { connectWallet, walletActionCreators } from 'core';
import logo from 'assets/img/logo.png';
import { promisify } from '../../utilities';
import { generateAddress } from '../../services/lib/bitcoinjs-lib';
import { exportKeyStore } from '../../services/lib/keystore-lib';

const { Content } = Layout;

class WalletConfirmContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
  }

  showWalletPage = e => {
    e.preventDefault();
    const genAddrObj = generateAddress();
    promisify(this.props.createWallet, {
      address: genAddrObj.address,
      privateKey: genAddrObj.privateKey,
    })
      .then(() => {
        const keyObject = exportKeyStore(genAddrObj.privateKey, this.state.password);
        this.exportToJson(keyObject);
        this.props.history.push('/wallet');
      })
      .catch(e => console.log(e));
  }

  exportToJson = keyObject => {
    const filename = 'keyStore.json';
    const contentType = 'application/json;charset=utf-8;';
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      const blob = new Blob([decodeURIComponent(encodeURI(keyObject))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const a = document.createElement('a');
      a.download = filename;
      a.href = 'data:'.concat(contentType).concat(',').concat(encodeURIComponent(JSON.stringify(keyObject)));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  onChangeData = (type, evt) => {
    switch (type) {
      case 'password':
        this.setState({ password: evt.target.value });
        break;
      default:
        this.setState({ password: '' });
        break;
    }
  }

  render() {
    return (
      <div className="block">
        <Layout>
          <Layout>
            <Content className="main">
              <Row className="logo_area">
                <Col className="center" sm={{ span: 22, offset: 1 }}>
                  <img alt="true" src={logo} className="logo" />
                </Col>
              </Row>
              <Row className="wallet_confirm_area">
                <form onSubmit={this.showWalletPage}>
                  <Col className="wallet_confirm_label center" sm={{ span: 14, offset: 5 }} xs={{ span: 18, offset: 3 }}>
                    <span>Add a password to save your wallet</span>
                  </Col>
                  <Col className="wallet_password center" sm={{ span: 22, offset: 1 }} xs={{ span: 20, offset:2 }}>
                    <Input addonAfter={<Icon type="setting" />} onChange={evt => this.onChangeData('password', evt)} addonBefore={<Icon type="setting" />} type="password" />
                  </Col>
                  <Col className="center" sm={{ span: 4, offset: 10 }} xs={{ span: 6, offset:8 }}>
                    <Button onClick={this.showWalletPage} type="submit">Save</Button>
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

WalletConfirmContainer.propTypes = {
  wallet: PropTypes.object,
  createWallet: PropTypes.func,
  history: PropTypes.object,
};

WalletConfirmContainer.defaultProps = {
  wallet: PropTypes.object,
  createWallet: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = ({ wallet }) => ({
  wallet,
});

const mapDisptachToProps = dispatch => {
  const {
    createWallet,
  } = walletActionCreators;

  return bindActionCreators({
    createWallet,
  }, dispatch);
};

export default compose(
  connectWallet(mapStateToProps, mapDisptachToProps),
)(WalletConfirmContainer);
