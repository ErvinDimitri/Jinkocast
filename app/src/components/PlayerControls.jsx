import React, {useState, useRef, useEffect} from "react"
import {useSelector} from "react-redux";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import {Avatar} from "@material-ui/core"
import { Text } from "./Text";
import { Counter } from "./Counter";
import { useDispatch } from "react-redux";
import {setCurrentPlaying} from "../actions/actions"
import { ButtonControl } from "./ButtonControl";
import Next from "@material-ui/icons/SkipNext";
import Previous from "@material-ui/icons/SkipPrevious";
import RepeatOne from "@material-ui/icons/RepeatOne";
import Repeat from "@material-ui/icons/Repeat";
import Play from "@material-ui/icons/PlayArrowRounded"
import Pause from "@material-ui/icons/PauseCircleFilledRounded"
import VolumeOn from "@material-ui/icons/VolumeUpRounded"
import VolumeMuteRounded from "@material-ui/icons/VolumeMuteRounded";
import LikeBtn from "@material-ui/icons/ThumbUp"

import "../assets/scss/PlayerControls.scss"

export const PlayerControls = ({podcast})=>{
    const [{id, name, channel, image, musicName, likes}, setPodcast] = useState(podcast);
    const [percentTime, setPercentTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(50);
    const [isRepeat, setRepeat] = useState(false);
    const [isPrevious, setPrevious] = useState(false);
    const [isNext, setNext] = useState(false);
    const [isMute, setMute] = useState(false);
    const [playBTN, setPlayBTN] = useState(false);
    const audioRef = useRef();
    const dispatch = useDispatch();
    const {playlists} = useSelector( state=>state.musicReducers);

    const handlePercentTIme =(event, value)=>{
        audioRef.current.currentTime = (duration * percentTime) / 100;
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

    const handleVolSlider= (event, newValue)=>{
        setVolume(newValue);
    }

    const formatTime = (s)=>{
        const date = new Date(1970, 0, 1);
        date.setSeconds(s);
        let ts = date.toTimeString().substr(0,8);
        if(s>86399){
            ts = Math.floor( (date - Date.parse("1/1/70"))/3600000 ) / ts.substr(2);
        }
        return ts.substring(3);
    }

    useEffect(()=>{
        {
            playBTN?
                audioRef.current.play()
                    .then(()=>{})
                    .catch((e)=>{
                        audioRef.current.pause();
                        audioRef.current.currentTime=0;
                    })
                :audioRef.current.pause();
            audioRef.current.volume = volume/100;
            audioRef.current.muted = isMute;
            audioRef.current.loop = isRepeat;
            audioRef.current.onloadeddata = ()=>{
                if(audioRef.current){
                    setDuration(audioRef.current.duration);
                }
            }
            setInterval(()=>{
                if(audioRef.current !== null){
                    setCurrentTime(audioRef.current.currentTime);
                }
            })
        }
    })

    useEffect(()=>{
        setPodcast(podcast)
    }, [podcast ])

    useEffect(()=>{
        setPercentTime((currentTime)/(duration/100));
    }, [currentTime, duration])

    useEffect(()=>{
        audioRef.current.onended = ()=>{
            setNext(true);
        }
    })

    useEffect(()=>{
        if(isPrevious){
            let previusPod=0;
            if(id>0){
                previusPod = (id-1)%playlists.length;
            }else{
                previusPod = playlists.length-1;
            }
             
            dispatch(setCurrentPlaying(playlists[previusPod]));
            setPrevious(false);
        }else if(isNext){
            let nextPod=(id+1) % playlists.length;
            dispatch(setCurrentPlaying(playlists[nextPod]));
            setNext(false);
        }
    }, [dispatch, id, playlists, isPrevious, isNext]);



    return(
        <div className={"PlayerControls"}>
            <div className={"slider"}>
                {
                    
                    !isNaN(percentTime)&&
                    <Slider 
                        className={"playback-completed"}
                        value={percentTime}
                        onChange={handlePercentTIme}
                    />
                    
                }
            </div>
            <div className={"part2"}>
                <div className={"infoDiv"}>
                    <Button 
                        className={"info"}
                        startIcon={ <Avatar src={`https://ipfs.infura.io/ipfs/${image}`} alt={name} style={{width: "110px", height: "110px"}}/>}
                    > {/* redirects the user to the selected podcast page */}
                        <div className={"basicInfo"}>
                            <Text className={"namePodcast"} text={name} />
                            <Text className={"channelPodcast"} text={channel} />                    
                        </div>
                    </Button>
                </div>
                <div className={"controls-center"}>
                    <audio ref={audioRef} src={ `https://ipfs.infura.io/ipfs/${musicName}`} preload={"metadata"} />
                    <div className={"likeBtn"}>
                        <LikeBtn fontSize={"large"} />
                        < Counter number={likes} unit={"likes"} />
                    </div>
                    <div className={"Btns"}>
                        <ButtonControl  //Previous BTN
                            type={"previous"} 
                            className={"previous"}
                            onClick={handleClick} 
                            icon0={<Previous fontSize={"large"} />} 
                            icon1={<Previous fontSize={"large"} />} />
                        <ButtonControl   // Play
                            type={"playBtn"} 
                            className={"playBtn"}
                            onClick={handleClick} 
                            icon0={<Pause fontSize={"large"} />} 
                            icon1={<Play fontSize={"large"} />} />
                        <ButtonControl   // Next
                            type={"next"} 
                            className={"next"}
                            onClick={handleClick} 
                            icon0={<Next fontSize={"large"} />} 
                            icon1={<Next fontSize={"large"} />} />
                    </div>
                </div>
                <div className={"controls-right"}>
                    <div className={"RepeatDiv"}>
                        <ButtonControl   // Repeat BTN
                            type={"repeat"} 
                            onClick={handleClick} 
                            icon0={<Repeat fontSize={"large"} />} 
                            icon1={<RepeatOne fontSize={"large"} />} />
                    </div>
                    <div className={"VolumeDiv"}>
                        <div className={"volume-slider"}>
                            <Slider className={"volSlider"} value={volume} onChange={handleVolSlider} />
                        </div>
                        <ButtonControl   // Volume ON/Mute
                            type={"playBtn"} 
                            onClick={handleClick} 
                            icon0={<VolumeOn fontSize={"large"} />} 
                            icon1={<VolumeMuteRounded fontSize={"large"} />} />
                            <div className={"timeDisplay"}>
                                <p>
                                    {formatTime(currentTime)} 
                                    :
                                    {formatTime(duration)}
                                </p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}