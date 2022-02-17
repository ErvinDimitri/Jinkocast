import React, {useState} from "react"
import { Button } from "@material-ui/core"
import "../assets/scss/ChannelItem.scss"

export const ChannelItem = ({name, from})=>{
    const [hover, setHover] = useState(null);
    const handleHover =()=>{
        if(from !== "card")
            setHover({
                boxShadow: "0.1px 1px 100px 0.1px #00f2ff",
                border: "1px solid #00f2ff"});
    }
    const handleOut =()=>{
        setHover(null);
    }
    return(
        <div className={"channelBTN"} onMouseOut={handleOut} onMouseOver={handleHover} style={hover}>
        <Button >
            <img src={require("../assets/img/Mic.png")}  />
            <p>{name}</p>
        </Button>
        </div>
    )
}