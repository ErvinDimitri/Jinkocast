import React, {useEffect, useState} from "react";
import { newContextComponents } from "@drizzle/react-components";
import {AudioCardC} from "../components/AudioCardC";
import {Account} from "./Account";
import {Upload} from "./Upload";
import {PlayerControls} from "../components/PlayerControls";
import { useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { ChannelList } from "../components/ChannelList";
import "../assets/scss/Home.scss"

export default ({ drizzle, drizzleState }) => {
  const { AccountData, ContractData, ContractForm } = newContextComponents;
  const [podcast, setPodcast] = useState(null);
  const {playing} = useSelector( state => state.musicReducers);
  const [section, setSection] = useState(<AudioCardC drizzle={drizzle} drizzleState={drizzleState} />);
  const [path, setPath] = useState(window.location.pathname);

  useEffect(()=>{
    setPodcast(playing);
  }, [playing])

  const navbarClick=()=>{
    setPath(window.location.pathname)
  }
  useEffect(()=>{
    switch(path){
      case "/": setSection(<AudioCardC drizzle={drizzle} drizzleState={drizzleState}/>); break;
      case "/account": setSection(<Account drizzle={drizzle} drizzleState={drizzleState}/>); break;
      case "/account/upload": setSection(<Upload drizzle={drizzle} drizzleState={drizzleState}/>); break;
      default: 
        setSection(<AudioCardC drizzle={drizzle} drizzleState={drizzleState}/>);
        alert("In development stage")
    }
  }, [path]);

  
  return (
    <div className="Home" onClick={navbarClick}>
      <Navbar />
      <div className={"middleDivs"}>
        <div className={"channels"}>
          <ChannelList />
        </div>
        <div className={"sectionDIV"}>
          {section}
        </div>
      </div>
      
      {
        podcast&& <PlayerControls podcast={podcast}/>

      }
    </div>
  );
};
