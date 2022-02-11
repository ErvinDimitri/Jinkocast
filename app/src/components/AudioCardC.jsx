import React, { useState, useEffect } from "react";
import {Card} from "./Card";
import "../assets/scss/AudioCardC.scss"

export const AudioCardC = ()=>{
    const [playlists, setPlaylists] = useState([]);

    drizzle.contracts.RegisterContract.methods.allPodcastsFromArtist(
        drizzleState.accounts[0]
    ).call()
        .then((data)=>{
            setPlaylists([data]);
        })



    return(
        <>
            <div className={"AudioCardC"} >
                {
                    playlists.map((audio)=>(
                        <Card key={audio} audio={audio} />
                    ))
                }
            </div>
        </>
    )
    
}
