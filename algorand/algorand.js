import algosdk from "algosdk";

const ALGOD_API_ADDR = "https://testnet-algorand.api.purestake.io/ps2";
const ALGOD_INDEXER_ADDR = "https://testnet-algorand.api.purestake.io/idx2";
const ALGOD_PORT = "";
const PURESTAKE_API_KEY = process.env["PURESTAKE_API_KEY"];
const ALGOD_API_TOKEN = {
  "X-API-Key": PURESTAKE_API_KEY,
};

export const algodClient = new algosdk.Algodv2(ALGOD_API_TOKEN, ALGOD_API_ADDR, ALGOD_PORT);
export const algoIndexerClient = new algosdk.Indexer(ALGOD_API_TOKEN, ALGOD_INDEXER_ADDR, ALGOD_PORT);

const mnemonic = process.env["MNEMONIC"];
const rewardProviderAccount = algosdk.mnemonicToSecretKey(mnemonic);
const assetId = 402192759;

export function calculateMultiplier(tokenHolding) {
  const c = 70;
  return 1 + (Math.log10(tokenHolding + 1) * c) / 100;
}

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

export async function sendAsset(address, baseAmount) {
  try {
    const userHolding = await getUserTokenHolding(address);
    const rewardMultiplier = calculateMultiplier(userHolding);
    const finalRewardAmount = Math.round(baseAmount * rewardMultiplier);

    console.log(`Computed reward amount: ${finalRewardAmount}`);

    const suggestedParams = await algodClient.getTransactionParams().do();

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
      rewardProviderAccount.addr,
      address,
      undefined,
      undefined,
      finalRewardAmount,
      algosdk.encodeObj("Sending ASA PHTM"),
      assetId,
      suggestedParams
    );

    const signedTxn = algosdk.signTransaction(txn, rewardProviderAccount.sk);
    const txConfirmation = await algodClient.sendRawTransaction(signedTxn.blob).do();

    console.log("Transaction ID:", txConfirmation.txId);
    return txConfirmation.txId;
  } catch (error) {
    console.error("Error sending ASA:", error);
  }
}
