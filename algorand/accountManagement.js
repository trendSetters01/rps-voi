import { algoIndexerClient } from './config.js';

const assetId = parseInt(process.env['PHTM_ASSET_ID'], 10);

export async function getUserTokenHolding(address) {
  try {
    const response = await algoIndexerClient.lookupAssetBalances(assetId).do();
    for (let balanceInfo of response.balances) {
      if (balanceInfo.address === address) {
        return balanceInfo.amount;
      }
    }
    return 0;
  } catch (error) {
    console.error('Error fetching user token balance:', error);
    return 0;
  }
}