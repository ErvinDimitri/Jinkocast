import Web3 from "web3";
import RegisterContract from "./contracts/RegisterContract.json"
import regCont from "../src/contracts/RegisterContract.json"
// import truffleArtifact from "../../app/src/contracts/RegisterContract.json"
// import truffleArtifact from "./contracts/build/RegisterContract.json"
const getWeb3 = ()=>{
  console.log("sssssss",window.web3,  window.web3.currentProvider)

  // Is there an injected web3 instance?
  if (typeof window.web3 !== 'undefined') {
    // App.web3Provider = web3.currentProvider;
    return new Web3({provider: window.web3.currentProvider});
  } else {
    // If no injected web3 instance is detected, fallback to Ganache.
    // App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:8545');
    // web3 = new Web3(App.web3Provider);
    console.log("Nooooooooop", window.web3.currentProvider)
  }
}
let web3= {
  block: false,
  // customProvider: new Web3("ws://localhost:8545"),
  // customProvider: getWeb3()
  // customProvider: new Web3(Web3.givenProvider || "ws://localhost:8545")
  customProvider: new Web3(async ()=>await Web3.givenProvider)

}




console.log("Nooooooooop", Web3.givenProvider)
const options = {
  web3: {
    block: false,
    // customProvider: new Web3("ws://localhost:8545"),
    // customProvider: getWeb3()
    // customProvider: new Web3(Web3.givenProvider || "ws://localhost:8545")
    customProvider: new Web3( Web3.givenProvider),
    // customProvider: new Web3("wss://kovan.infura.io/ws/v3/5b2a79e624554c8ab922b9a84b076645")

  },
  // contracts: [RegisterContract],
  // contracts: [
  //   // truffleArtifact, // A regular Truffle contract artifact
  //   {
  //     contractName: 'RegisterContract',
  //     // web3Contract: new options.web3.eth.Contract(regCont.abi, "0x879DbdAa3116c37Cd1f6d1b0F7FDDbE0E0279405", {data: 'deployedBytecode' }) // An instance of a Web3 contract
  //     // web3Contract: async ()=> await new Web3.givenProvider.eth.Contract(JSON.stringify(regCont.abi), "0x879DbdAa3116c37Cd1f6d1b0F7FDDbE0E0279405") // An instance of a Web3 contract
  //   }
  // ],
  contracts:[
    // web3Prov
  ],
  events: {
  },
};
export default options;
