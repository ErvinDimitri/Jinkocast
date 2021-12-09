import React, {useState} from "react";
import { newContextComponents } from "@drizzle/react-components";
import {AudioCardC} from "../components/AudioCardC";
import {PlayerControls} from "../components/PlayerControls";


export default ({ drizzle, drizzleState }) => {
  const { AccountData, ContractData, ContractForm } = newContextComponents;

  
  return (
    <div className="Home">
      <AudioCardC />
      <PlayerControls />
    </div>
  );
};
