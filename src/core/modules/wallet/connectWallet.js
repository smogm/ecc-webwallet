import { connect } from 'react-redux';
import { walletActionCreators } from './actions';

function mapStateToProps({ wallet }) {
  return {
    wallet,
  };
}

const mapDispatchToProps = walletActionCreators;

export function connectWallet(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps,
  );
}
