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
const receiver = "CPBVPZNKFOVIHGG4EDX3PRJ7NDYLKL5RL3JIK2X5HZXVGKDY4E65W62TPM";
// Setup Account
const mnemonic = process.env["MNEMONIC"];
const generatedAccount = algosdk.mnemonicToSecretKey(
  mnemonic
);

async function sendAlgo(amount) {
  try {
    // Fetch account details
    const accountInfo = await algodClient.accountInformation(sender).do();
    console.log(accountInfo)
    const suggestedParams = await algodClient.getTransactionParams().do();
    console.log(suggestedParams);
    // Create a transaction
    const txn = {
      from: generatedAccount.addr,
      to: generatedAccount.addr,
      fee: suggestedParams.minFee,
      amount: amount,
      ...suggestedParams,
      note: algosdk.encodeObj("Sending Algo with PureStake API"),
    };

    // Sign the transaction
    const signedTxn = algosdk.signTransaction(txn, generatedAccount.sk);

    // Send the transaction
    const txConfirmation = await algodClient.sendRawTransaction(signedTxn.blob).do();

    console.log("Transaction ID:", txConfirmation.txId);
    return txConfirmation.txId;
  } catch (error) {
    console.error("Error sending Algo:", error);
  }
}

module.exports = {
  sendAlgo
};
