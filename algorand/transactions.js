import algosdk from "algosdk";
import { algodClient } from './config.js';

import { getUserTokenHolding } from './accountManagement.js';
import { calculateMultiplier } from '../utils/index.js';

const mnemonic = process.env["MNEMONIC"];
const rewardProviderAccount = algosdk.mnemonicToSecretKey(mnemonic);
const assetId = parseInt(process.env['ASSET_ID'], 10);

export async function sendAsset(address, baseAmount) {
  try {
    // Input validation
    if (!algosdk.isValidAddress(address)) {
      throw new Error('Invalid Algorand address provided.');
    }

    // Existing logic for sending assets
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
    console.error("An error occurred:", error.message);
    throw error;
  }
}

