import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connectWallet, walletActionCreators } from 'core';
import { Row, Col, Button, Input, Layout } from 'antd';
import logo from 'assets/img/logo.png';
import { promisify } from '../../utilities';
import { importAddressFromPrivateKey } from '../../services/lib/eccoin-lib';
import { importKeyStore } from '../../services/lib/keystore-lib';
import { Base64Decode } from '../../services/common';


const { Content } = Layout;

class KeystoreUploadContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: '',
      fileData: '',
      password: '',
      keyObject: null,
      isValidPwd: true,
    };
  }

  fileChangedHandler = event => {
    if (event.target.files.length !== 0) {
      this.setState({ selectedFile: event.target.files[0] });
      const _ = this;
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onload = function (upload) {
        _.setState({ fileData: upload.target.result });
      };
      reader.readAsDataURL(file);
      setTimeout(() => {
        _.setState({ keyObject:  Base64Decode(_.state.fileData.substring(_.state.fileData.indexOf(',') + 1)) });
      }, 1000);
    }
  }

  chooseFile = () => {
    this.inputElement.click();
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

  unlockWallet = e => {
    e.preventDefault();
    if (this.state.password !== '') {
      if (this.state.keyObject) {
        importKeyStore(this.state.password, this.state.keyObject)
          .then(privateKey => {
            if (privateKey.length) {
              const address = importAddressFromPrivateKey(privateKey);
              promisify(this.props.createWallet, {
                address,
                privateKey,
              })
                .then(() => {
                  this.setState({ isValidPwd: true });
                  this.props.history.push('/wallet');
                })
                .catch(e => console.log(e));
            } else {
              this.setState({ isValidPwd: false });
            }
          })
          .catch(() => {
            this.setState({ isValidPwd: false });
          });
      }
    } else {
      this.setState({ isValidPwd: false });
    }
  }

  render() {
    return (
      <div className="block">
        <Layout>
          <Content className="main">
            <Row className="logo_area">
              <Col className="center" sm={{ span: 22, offset: 1 }}>
                <img alt="true" src={logo} className="logo" />
              </Col>
            </Row>
            <Row className="wallet_unlock_area">
              <form onSubmit={e => this.unlockWallet(e)}>
                <Col className="wallet_keystore_label center" sm={{ span: 16, offset: 4 }} xs={{ span: 18, offset: 3 }}>
                  <span>Select a keystore file and enter password</span>
                </Col>
                <Col className="keystore_btn center" sm={{ span: 22, offset: 1 }} xs={{ span: 20, offset:2 }}>
                  <input type="file" ref={input => { this.inputElement = input; }} onChange={this.fileChangedHandler} accept=".json,application/json" />
                  <Button type="button" onClick={this.chooseFile}>{ this.state.selectedFile ? this.state.selectedFile.name : 'Keystore file' }</Button>
                </Col>
                <Col className="wallet_password center" sm={{ span: 22, offset: 1 }} xs={{ span: 20, offset:2 }}>
                  <Input disabled={this.state.fileData === ''} onChange={evt => this.onChangeData('password', evt)} type="password" placeholder="Password" autoComplete="new-password" />
                </Col>
                {
                  !this.state.isValidPwd ? (
                    <Col sm={{ span: 22, offset: 1 }} xs={{ span: 20, offset:2 }}>
                      <span className="invalid_msg">Invalid Password</span>
                    </Col>
                  ) : null
                }
                <Col className="unlock_btn center" sm={{ span: 4, offset: 10 }} xs={{ span: 6, offset:8 }}>
                  <Button onClick={this.unlockWallet} type="submit" disabled={this.state.fileData === '' || !this.state.password}>Unlock</Button>
                </Col>
              </form>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

KeystoreUploadContainer.propTypes = {
  createWallet: PropTypes.func,
  history: PropTypes.object,
};

KeystoreUploadContainer.defaultProps = {
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
)(KeystoreUploadContainer);
