import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Text} from "./Text";
import {setCurrentPlaying} from "../actions/actions"
import "../assets/scss/Card.scss"
import { ChannelItem } from "./ChannelItem";
import {getContent} from "../assets/utils"


export const Card = ({audio})=>{
    const {id} = audio;
    const [audio_data, setAudio_data] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [pod_audio, setPod_audio] = useState("");
    const channel ="Podcast A59";
    const [like, setLike]=useState(Math.round(Math.random(8000)*100));
    const [views, setViews]=useState(Math.round(Math.random(10000)*100));

    const [load, setLoad] = useState(true);
    if(load){
        setAudio_data(getContent(audio));
        setLoad(false)
    }
    useEffect(()=>{
        async function f(){
            console.log( audio_data)
            Promise.all([audio_data]).then((info)=>
                {console.log(info[0].date)
                setTitle( info[0].title)
                setDate(info[0].date)
                setType(info[0].type)
                setImage(info[0].imgCID)
                setPod_audio(info[0].podCID)
                setDescription(info[0].description)
                }
            )
                .catch(error=>{
                    console.log("New Error: ",error)
                })
        }
        f()
    }, [audio_data]) 


    const dispatch = useDispatch();
    const handleClick = ()=>{  //{id, name, channel, image, musicName, likes}
        let podMetadata = {id: audio,
                            name: title,
                            channel: channel,
                            image: image,
                            musicName: pod_audio,
                            likes: like}

        dispatch( setCurrentPlaying(podMetadata));
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
            {
               image==="" ?
                    <div class="loader"></div>
                :
                <>
                    <div className={"thumbnail"}>
                        {/* < img src={ `https://ipfs.infura.io/ipfs/${image}`} alt={title}/> */}
                    </div>
                    
                    <div className={"Info"}>
                        <div className={"name"}>
                            <p> {title} </p>
                        </div>
                        <div className={"otherInfo"}>
                            <div className={"part1"}>
                                <div className={"channel"}>
                                    <ChannelItem name={channel} from={"card"}/>
                                </div>
                                <div className={"views"}>
                                    <p> {type} </p>
                                    <Text text={views+" views"} />
                                    <Text text={like+" likes"} />

                                </div>
                            </div>
                            <div className={"part2"}>
                                <p>{description}</p>
                            </div>
                        </div>                  
                    </div>
                </>
            }
        </div>
    )
}