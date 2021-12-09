import React, {useState, useRef} from "react"
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import {Avatar} from "@material-ui/core"
import { Text } from "./Text";
import { Counter } from "./Counter";
import { useDispatch } from "react-redux";
import {actions} from "../actions/actions"
import { ButtonControl } from "./ButtonControl";
import Next from "@material-ui/icons/SkipNext";
import Previous from "@material-ui/icons/SkipPrevious";
import RepeatOne from "@material-ui/icons/RepeatOne";
import Repeat from "@material-ui/icons/Repeat";


export const PlayerControls = ()=>{
    const [{id, name, channel, image, musicName, likes}, setPodcast] = useState(podcast);
    const [percentTime, setPercentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isRepeat, setRepeat] = useState(false);
    const [isPrevious, setPrevious] = useState(false);
    const [isNext, setNext] = useState(false);
    const [isMute, setMute] = useState(false);
    const [playBTN, setPlayBTN] = useState(false);
    const audioRef = useRef();
    const dispatch = useDispatch();
    
    const handlePercentTIme =(event, value)=>{
        audio.current.currentTime = (duration * percentTime) / 100;
        setPercentTime(value)
    }

    const handleClick = (type, value)=>{
        switch(type){
            case "playBtn":
                setPlayBTN(value); break;
            case "previous":
                setPrevious(value); break;
            case "next":
                setNext(value); break;
            case "volume":
                setVolume(value); break;
            case "repeat":
                setRepeat(value); break;
            case "mute":
                setMute(value); break;
            default: break;
        }
    }

    return(
        <div className={"footer-player"}>
            <div className={"SlideBar"}>
                {
                    !isNaN(percentTime)&&
                    <Slider 
                        className={"playback-completed"}
                        value={percentTime}
                        onClick={handlePercentTIme}
                    />
                }
            </div>
            <Button 
                className={"metaData"}
                startIcon={ <Avatar src={require("../assets/img/"+image)} alt={name} />}
            > {/* redirects the user to the selected podcast page */}
                <div className={"basicInfo"}>
                    <Text className={"namePodcast"} text={name} />
                    <Text className={"channelPodcast"} text={channel} />
                    < Counter number={likes} unit={"likes"} />
                </div>
            </Button>
            <div className={"controls"}>
                <ButtonControl className={""} onClick={handleClick} />
            </div>
        </div>
    )
}
