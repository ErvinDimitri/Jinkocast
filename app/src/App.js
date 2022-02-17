import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import Home from "./pages/Home";
import "./App.css";
import regCont from "../src/contracts/RegisterContract.json"
import Web3 from "web3";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const addRegisContr = ()=>{
  let web_3 = new Web3( Web3.givenProvider)
  let web3Contract = new web_3.eth.Contract(regCont.abi, "0x6Fdc1F3e92e4e75e27B92329974149642F55d23b")
  let contractConfig = {contractName:"RegisterContract", web3Contract:web3Contract}
  drizzle.addContract(contractConfig, [])
}

const drizzle = new Drizzle(drizzleOptions);
addRegisContr();

const connectMetamask=async()=>{
  await window.ethereum.request({method:'eth_requestAccounts'})
  if(await window.ethereum.request({method:'eth_chainId'}) == 97)
    await window.ethereum.request({method:'wallet_switchEthereumChain', params: [{chainId: 97}]})
}
const App = () => {
  
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return (
              <>
                <p style={{color:"#00f2ff"}}> Make sure you have installed Metamask, have selected BSC testnet and connected to this site</p>
                <button onClick={connectMetamask}>Connect Wallet</button>
              </>
            )
          }
          return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/">
                          <Home drizzle={drizzle} drizzleState={drizzleState} />
                        </Route>
                    </Switch>
                </Router>

            </div>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
