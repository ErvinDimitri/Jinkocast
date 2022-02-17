import React, { useState } from "react";
import {Card} from "./Card";
import "../assets/scss/AudioCardC.scss"


//Precisa de organizar ai uns objs de playlist pra usar no PlayerControls

export const AudioCardC = ({ drizzle, drizzleState })=>{
    const [playlists, setPlaylists] = useState([]);
    async function exec(){
        let channels = await drizzle.contracts.RegisterContract.methods.getChannels().call();
        console.log("llll",channels)
        
        channels.forEach(chan=>{
            drizzle.contracts.RegisterContract.methods.allPodcastsFromArtist(
                chan
            ).call()
                .then((data)=>{
                    let hashArr=[]
                    data.forEach( hash=>{
                        hashArr.push(hash)
                    })
                    setPlaylists(hashArr)
                })
        })
    }
    exec()

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