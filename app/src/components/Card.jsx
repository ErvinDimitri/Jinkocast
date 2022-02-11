import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Text} from "./Text";
import {setCurrentPlaying,increaseTimesPlayed} from "../actions/actions"
import "../assets/scss/Card.scss"
import { ChannelItem } from "./ChannelItem";
import {getContent} from "../assets/utils"


export const Card = ({audio})=>{
    const {id, channel,views,description, image, likes, type} = audio;
    const [audio_data, setAudio_data] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    
    const [load, setLoad] = useState(true);
    if(load){
        setAudio_data(getContent());
        
        setLoad(false)
    }
    useEffect(()=>{
        async function f(){
            console.log( audio_data)
            Promise.all([audio_data]).then((info)=>
                {console.log(info[0].date)
                setName( info[0].name)
                setDate(info[0].date)}
            )
        }
        f()
    }, [audio_data]) 


    const dispatch = useDispatch();
    const handleClick = ()=>{
        dispatch( setCurrentPlaying(audio));
        dispatch( increaseTimesPlayed(id));
    }
    const [neon, setNeon] = useState(null);
    const handleHover =()=>{
        setNeon({
            boxShadow: "0.1px 1px 100px 0.1px #00f2ff",
            border: "1px solid #00f2ff"})
    }
    const handleOut=()=>{
        setNeon(null)
    }

    const clicks = ()=>{
        console.log(audio_data)
    }
    return(
        <div className={"card"} onClick={handleClick} onMouseOver={handleHover} style={neon} onMouseOut={handleOut}>
            <div className={"thumbnail"}>
                {/* < img src={ `https://ipfs.infura.io/ipfs/QmdMgwDTZZTEHSfou4Zfc7M15P1cB49UoXHojy7uMHUREq`} alt={name}/> */}
            </div>

            <div className={"Info"}>
                <div className={"name"}>
                    <p> {name} </p>
                </div>
                <div className={"otherInfo"}>
                    <div className={"part1"}>
                        <div className={"channel"}>
                            <ChannelItem name={channel} from={"card"}/>
                        </div>
                        <div className={"views"}>
                            {/* <p> {type} </p> */}
                            <Text text={views+" views"} />
                            <Text text={likes+" likes"} />

                        </div>
                    </div>
                    <div className={"part2"}>
                        <p>{description}{date} </p>
                    </div>
                </div>

            </div> 
        </div>
    )
}
