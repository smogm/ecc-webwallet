import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connectWallet, walletActionCreators } from 'core';
import { Row, Col, Button, Layout } from 'antd';
import { promisify } from '../../utilities';
import logo from 'assets/img/logo.png';
import ReceiveContainer from './ReceiveContainer/ReceiveContainer';
import SendContainer from './SendContainer/SendContainer';

const { Content } = Layout;

class mainWalletContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      containerType: 'receive',
    };
    this.getBalance();
  }

  componentWillMount() {
    this.mounted = true;
    if (this.mounted) {
      this.balanceRef = setInterval(() => {
        this.getBalance();
      }, 1000 * 90);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    clearInterval(this.balanceRef);
  }

  getBalance = () => {
    const { wallet } = this.props;
    promisify(this.props.getBalance, {
      address: wallet.address,
    })
      .then(() => {
      })
      .catch(e => console.log(e));
  }

  showWalletContent = containerType => {
    this.setState({ containerType });
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
            <Row className="main_wallet_area">
              <Row className="main_wallet_label">
                <Col className="center">
                  {
                    this.state.containerType === 'receive' ? (<span>Receive your funds</span>) : (<span>Send your funds</span>)
                  }
                </Col>
              </Row>
              <Row className="main_wallet_btn">
                <Col className="receive_btn" sm={{ span: 12 }} xs={{ span: 12 }}>
                  <Button className={this.state.containerType === 'receive' ? 'selected' : null} icon="qrcode" onClick={() => this.showWalletContent('receive')}>Receive</Button>
                </Col>
                <Col className="send_btn" sm={{ span: 12 }} xs={{ span: 12 }}>
                  <Button className={this.state.containerType === 'send' ? 'selected' : null} onClick={() => this.showWalletContent('send')}>Send</Button>
                </Col>
              </Row>
              <Row className="main_wallet_container">
                {
                  this.state.containerType === 'receive' ? (<ReceiveContainer />) : (<SendContainer />)
                }
              </Row>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}
mainWalletContainer.propTypes = {
  wallet: PropTypes.object,
  getBalance: PropTypes.func,
};

mainWalletContainer.defaultProps = {
  wallet: PropTypes.object,
  getBalance: PropTypes.func,
};

const mapStateToProps = ({ wallet }) => ({
  wallet,
});

const mapDisptachToProps = dispatch => {
  const {
    getBalance,
  } = walletActionCreators;

  return bindActionCreators({
    getBalance,
  }, dispatch);
};

export default compose(
  connectWallet(mapStateToProps, mapDisptachToProps),
)(mainWalletContainer);
