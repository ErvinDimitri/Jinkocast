import Web3 from "web3";
import RegisterContract from "./contracts/RegisterContract.json"
const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [RegisterContract],
  events: {
  },
};

export default options;
