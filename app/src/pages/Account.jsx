import React from "react";
import { useSelector } from "react-redux";
import Plus from "@material-ui/icons/AddRounded"
import { Button } from "@material-ui/core";
import { Card } from "../components/Card"
import "../assets/scss/Account.scss"

export const Account =()=>{
    const {playlists} = useSelector(state => state.musicReducers)
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
                            <Button className={"UploadBTN"} startIcon={<Plus fontSize={"large"}/>} >
                                <p>Upload Podcast</p>
                            </Button>
                        </div>
                    </div>
                    <div className={"PodsDIV"}>
                        {
                            playlists.map((audio)=>(
                                <Card key={audio.id} audio={audio} />
                            ))
                        }
                    </div>
                </div>
            </div>
            
        </div>
    )
}