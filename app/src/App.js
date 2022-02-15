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
  let web3Contract = new web_3.eth.Contract(regCont.abi, "0x879DbdAa3116c37Cd1f6d1b0F7FDDbE0E0279405")
  let contractConfig = {contractName:"RegisterContract", web3Contract:web3Contract}
  drizzle.addContract(contractConfig, [])
}

const drizzle = new Drizzle(drizzleOptions);
addRegisContr();
const App = () => {

  
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading...Please wait"
          }
          return (
            <div className="App">
              <Home drizzle={drizzle} drizzleState={drizzleState} />
            </div>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
