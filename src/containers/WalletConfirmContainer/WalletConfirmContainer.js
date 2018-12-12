import React, { PureComponent } from 'react';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { Row, Col, Icon, Button, Input, Layout } from 'antd';
import { connectWallet, walletActionCreators } from 'core';
import { promisify } from '../../utilities';
import { generateAddress } from '../../services/lib/bitcoinjs-lib.js';
import { exportKeyStore } from '../../services/lib/keystore-lib.js';
import logo from 'assets/img/logo.png';

const { Content, Header } = Layout;

class WalletConfirmContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    }
  }

  showWalletPage = () => {
    //Test Address: GTsqojGaG2sy4uUTwyqwjxDtaVaF9ja5DV 
    let genAddrObj = generateAddress();
    promisify(this.props.createWallet, {
      address: genAddrObj.address,
      privateKey: genAddrObj.privateKey
    })
      .then((res) => {
        let keyObject = exportKeyStore(genAddrObj.privateKey, this.state.password);
        this.exportToJson(keyObject);
        this.props.history.push('/wallet');
      })
      .catch(e => console.log(e));
  }

  exportToJson = (keyObject) => {
    let filename = "keyStore.json";
    let contentType = "application/json;charset=utf-8;";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob([decodeURIComponent(encodeURI(keyObject))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(keyObject));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  onChangeData = (type, evt) => {
    switch(type) {
      case 'password':
        this.setState({ password: evt.target.value });
        break;
      default:
        this.setState({ password: '' });
        break;
    }
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
                  <Input addonAfter={<Icon type="setting" />} onChange={(evt) => this.onChangeData('password', evt)} addonBefore={<Icon type="setting" />} type="password" />
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

const mapStateToProps = ({wallet}) => ({
  wallet: wallet
});

const mapDisptachToProps = (dispatch) => {
  const {
    createWallet
  } = walletActionCreators

  return bindActionCreators({
    createWallet
  }, dispatch);
}

export default compose(
  connectWallet(mapStateToProps, mapDisptachToProps),
)(WalletConfirmContainer);