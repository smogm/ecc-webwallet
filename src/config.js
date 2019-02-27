export const config = {
    FEE_AMOUNT: 0.000001,
    COIN_DECIMALS: 6,
    EXPORER_API_KEY: '129d04656791',
    EXPORER_API_ENDPOINT: 'https://chainz.cryptoid.info/ecc/api.dws',
    EXPORER_TX_URL: 'https://chainz.cryptoid.info/ecc/tx.dws?',
    BACKEND_API_ENDPOINT: 'https://ecc.mastercalls.io/api/v1'
};

export function getExplorerApiBalanceUrl(address) {
	return `${config.EXPORER_API_ENDPOINT}?q=getbalance&a=${address}`
}

export function getExplorerApiUtxoUrl(address) {
	return `${config.EXPORER_API_ENDPOINT}?q=unspent&active=${address}&key=${config.EXPORER_API_KEY}`
}
