import React, {useEffect, useState} from "react";
import { newContextComponents } from "@drizzle/react-components";
import {AudioCardC} from "../components/AudioCardC";
import {PlayerControls} from "../components/PlayerControls";
import { useSelector } from "react-redux";

export default ({ drizzle, drizzleState }) => {
  const { AccountData, ContractData, ContractForm } = newContextComponents;
  const [podcast, setPodcast] = useState(null);
  const {playing} = useSelector( state => state.musicReducers);

  useEffect(()=>{
    setPodcast(playing);
  }, [playing])
  
  
  return (
    <div className="Home">
      <AudioCardC />
      {
        podcast&& <PlayerControls podcast={podcast}/>
      }
      
    </div>
  );
};
