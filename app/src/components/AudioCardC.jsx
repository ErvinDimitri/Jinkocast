import React from "react";
import {Card} from "./Card";
import { useSelector } from "react-redux";

export const AudioCardC = ()=>{
    const {playlists} = useSelector( state=> state.musicReducers);

    return(
        <div className={"PodcastC"}>
            {
                playlists.map((audio)=>(
                    <Card key={audio.id} audio={audio} />
                ))
            }
        </div>
    )
    
}
