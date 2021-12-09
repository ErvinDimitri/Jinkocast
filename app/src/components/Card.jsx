import React from "react";
import {useDispatch} from "react-redux";
import {Text} from "./Text";
import {setCurrentPlaying,increaseTimesPlayed} from "../actions/actions";

export const Card = ({audio})=>{
    const {id, name, channel,views,description, image, type} = audio;

    const dispatch = useDispatch();
    const handleClick = ()=>{
        dispatch( setCurrentPlaying(name));
        dispatch( increaseTimesPlayed(id));
    }

    return(
        <div className={"card"} onClick={handleClick}>
            <div className={"thumbnail"}>
                < img src={ require("../assets/img/"+image)} alt={name}/>
            </div>
            <React.Fragment>
                <Text text={name} />
                <Text text={channel} />
                <Text text={views+" views"} />
                <Text text={description} />
                <Text text={type} />
            </React.Fragment>
        </div>
    )
}
