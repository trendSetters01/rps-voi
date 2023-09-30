const algosdk = require("algosdk");

const ALGOD_API_ADDR = "https://testnet-algorand.api.purestake.io/ps2";
const ALGOD_PORT = "";
const PURESTAKE_API_KEY = process.env["PURESTAKE_API_KEY"];
const ALGOD_API_TOKEN = {
  "X-API-Key": PURESTAKE_API_KEY,
};

const algodClient = new algosdk.Algodv2(
  ALGOD_API_TOKEN,
  ALGOD_API_ADDR,
  ALGOD_PORT
);
const algoIndexerClient = new algosdk.Indexer(
  ALGOD_API_TOKEN,
  ALGOD_API_ADDR,
  ALGOD_PORT
);

const sender = "CPBVPZNKFOVIHGG4EDX3PRJ7NDYLKL5RL3JIK2X5HZXVGKDY4E65W62TPM";

// Setup Account
const mnemonic = process.env["MNEMONIC"];
const rewardProviderAccount = algosdk.mnemonicToSecretKey(
  mnemonic
);

async function sendAsset(address, amount) {
  try {
    // Fetch account details
    const accountInfo = await algodClient.accountInformation(sender).do();
    const suggestedParams = await algodClient.getTransactionParams().do();

    // Create an asset transfer transaction
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
      rewardProviderAccount.addr,
      address,
      undefined, // Close-to address (none in this case)
      undefined, // Sender's address, in case of clawback (none in this case)
      amount,
      algosdk.encodeObj("Sending ASA with PureStake API"),
      402192759, // Asset ID of the ASA you want to send
      suggestedParams
    );

    // Sign the transaction
    const signedTxn = algosdk.signTransaction(txn, rewardProviderAccount.sk);

    // Send the transaction
    const txConfirmation = await algodClient.sendRawTransaction(signedTxn.blob).do();

    console.log("Transaction ID:", txConfirmation.txId);
    return txConfirmation.txId;
  } catch (error) {
    console.error("Error sending ASA:", error);
  }
}


module.exports = {
  sendAsset
};
