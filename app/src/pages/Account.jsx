import React, {useState} from "react";
import Plus from "@material-ui/icons/AddRounded"
import { Button } from "@material-ui/core";
import { Card } from "../components/Card"
import "../assets/scss/Account.scss"
import { Link } from "react-router-dom";
export const Account =({ drizzle, drizzleState })=>{
    const [playlists, setPlaylists] = useState([]);
    try{
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
    }
    catch(err){
        console.log(err)
        alert("Make sure you have installed Metamask and have selected BSC testnet")
    }

    return(
        <div className={"Account"}>
            <div className={"front"}>
                <div className={"Profile"}>
                    <img src={ require("../assets/img/Mic.png")} />
                    <p>Drop the Mic</p>
                </div>
            </div>
            <div className={"back"}>
                <div className={"bgImgDIV"}>
                    <img src={ require("../assets/img/bgAccount3.jpg")} />
                </div>
                
                <div className={"UploadedPods"}>
                    <div className={"part1"}>
                        <div className={"title"}>
                            <p>
                                My Podcasts
                            </p>
                        </div>
                        <div className={"NewPod"}>
                        <Link to={"/account/upload"}>
                            <Button className={"UploadBTN"} startIcon={<Plus fontSize={"large"}/>} >
                                <p>Upload Podcast</p>
                            </Button>
                        </Link>
                        </div>
                    </div>
                    <div className={"PodsDIV"}>
                        {
                            playlists.length > 0?
                                playlists.map((audio)=>{
                                    console.log("aud__",audio[2])
                                    if(audio[2]!=""){
                                        return <Card key={audio[0]+"_"+audio[1]} audio={audio[2]} />
                                    }
                                    
                                })
                            : <p>You havent upload any podcast</p>
                        }
                    </div>
                </div>
            </div>
            
        </div>
    )
}