import Web3 from "web3";
import RegisterContract from "./contracts/RegisterContract.json"
import regCont from "../src/contracts/RegisterContract.json"
const getWeb3 = ()=>{
  console.log("sssssss",window.web3,  window.web3.currentProvider)

  // Is there an injected web3 instance?
  if (typeof window.web3 !== 'undefined') {
    return new Web3({provider: window.web3.currentProvider});
  } else {
    // If no injected web3 instance is detected, fallback to Ganache.
    // App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:8545');
    // web3 = new Web3(App.web3Provider);
    console.log("", window.web3.currentProvider)
  }
}
let web3= {
  block: false,
  customProvider: new Web3(async ()=>await Web3.givenProvider)

}

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
