import React, { PureComponent } from 'react';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connectWallet, walletActionCreators } from 'core';
import { promisify } from '../../utilities';
import { generateAddress } from '../../services/lib/bitcoinjs-lib.js';
import { Row, Col, Icon, Button, Input, Layout } from 'antd';
import logo from 'assets/img/logo.png';

const { Content, Header } = Layout;

class KeystoreUploadContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: '',
      fileData: '',
      password: '',
      isValidPwd: true
    }
  }

  fileChangedHandler = (event) => {
    if(event.target.files.length !== 0) {
      this.setState({ selectedFile: event.target.files[0] })
      var _ = this;
      var reader = new FileReader();
      var file = event.target.files[0];
      reader.onload = function(upload) {
        _.setState({ fileData: upload.target.result });
      };
      reader.readAsDataURL(file);
      setTimeout(function() {
        console.log('fileData', _.state.fileData)
      }, 1000);
    }
  }

  chooseFile = () => {
    this.inputElement.click();
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

  unlockWallet = () => {
    if (this.state.password !== '' && this.state.password === 'bitcoingreen') {
      this.setState({ isValidPwd: true });
      let genAddrObj = generateAddress();
      promisify(this.props.createWallet, {
        address: genAddrObj.address,
        privateKey: genAddrObj.privateKey
      })
        .then((res) => {
          this.props.history.push('/wallet');
        })
        .catch(e => console.log(e));
    } else {
      this.setState({ isValidPwd: false });
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
              <Row className="wallet_unlock_area">
                <Col className="wallet_keystore_label center" sm={{ span: 16, offset: 4 }} xs={{ span: 18, offset: 3 }}>
                  <span>Enter a keystore password to get started</span>
                </Col>
                <Col className="keystore_btn center" sm={{ span: 22, offset: 1 }} xs={{ span: 20, offset:2 }}>
                  <input type="file" ref={input => this.inputElement = input} onChange={this.fileChangedHandler}/>
                  <Button onClick={this.chooseFile}>{ this.state.selectedFile ? this.state.selectedFile.name : 'Keystore file' }</Button>
                </Col>
                <Col className="wallet_password center" sm={{ span: 22, offset: 1 }} xs={{ span: 20, offset:2 }}>
                  <Input disabled={this.state.fileData === '' ? true : false} onChange={(evt) => this.onChangeData('password', evt)} addonAfter={<Icon type="setting" />} addonBefore={<Icon type="setting" />} type="password" />
                </Col>
                {
                  !this.state.isValidPwd ? 
                  <Col sm={{ span: 22, offset: 1 }} xs={{ span: 20, offset:2 }}>
                    <span className="invalid_msg">Invalid Password</span>
                  </Col> :
                  null
                }
                <Col className="unlock_btn center" sm={{ span: 4, offset: 10 }} xs={{ span: 6, offset:8 }}>
                  <Button onClick={this.unlockWallet} disabled={this.state.fileData === '' || !this.state.password ? true : false}>Unlock</Button>
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
)(KeystoreUploadContainer);