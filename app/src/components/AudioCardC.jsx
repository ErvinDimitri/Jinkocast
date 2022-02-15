import React, { useState } from "react";
import {Card} from "./Card";
import "../assets/scss/AudioCardC.scss"

export const AudioCardC = ({ drizzle, drizzleState })=>{
    const [playlists, setPlaylists] = useState([]);
    drizzle.contracts.RegisterContract.methods.allPodcastsFromArtist(
        drizzleState.accounts[0]
    ).call()
        .then((data)=>{
            let hashArr=[]
            data.forEach( hash=>{
                hashArr.push(hash)
            })
            setPlaylists(hashArr)
        })

    return(
        <>{
            playlists.length>0 &&
        
                <div className={"AudioCardC"} >
                    {
                        playlists.map((audio)=>{
                            console.log("aud__",audio[2])
                            if(audio[2]!=""){
                                return <Card key={audio[0]+"_"+audio[1]} audio={audio[2]} />
                            }
                            
                        })
                    }
                </div>
            }
        </>
    )
    
}
