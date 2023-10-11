import { algoIndexerClient } from './config.js';

const assetId = parseInt("6670024", 10);
console.log(assetId);
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
const userHolding = await getUserTokenHolding("HXEMGEIGMC7YHITAZKOUN7XR2OQGQFAF2RMFMTFQXKVNZB65E4B3DWE7N4");
console.log(userHolding);