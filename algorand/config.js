import algosdk from "algosdk";

const ALGOD_API_ADDR = "https://testnet-api.voi.nodly.io";
const ALGOD_INDEXER_ADDR = "https://testnet-idx.voi.nodly.io";
const ALGOD_PORT = "";
const ALGOD_API_TOKEN = {
  "X-API-Key": '',
};


const algodClient = new algosdk.Algodv2(ALGOD_API_TOKEN, ALGOD_API_ADDR, ALGOD_PORT);
const algoIndexerClient = new algosdk.Indexer(ALGOD_API_TOKEN, ALGOD_INDEXER_ADDR, ALGOD_PORT);

export { algodClient, algoIndexerClient };
