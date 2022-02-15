import Web3 from "web3";
const options = {
  web3: {
    block: false,
    customProvider: new Web3( Web3.givenProvider),
  },
  contracts:[
  ],
  events: {
  },
};
export default options;
