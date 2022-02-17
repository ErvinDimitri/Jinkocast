import React from "react"
import {ChannelItem} from "./ChannelItem"
import "../assets/scss/ChannelList.scss"

export const ChannelList = ()=>{

    return(
        <div className={"channelList"}>
            <div className={"title"}>
                <h1>My Channels</h1>
            </div>
            <div className={"channelItens"}>
                <ChannelItem name={"Podcast A59"} />
                <ChannelItem name={"Pods Cst"} />
                <ChannelItem name={"Meme zone"} />
                <ChannelItem name={"Live 3min"} />
                <ChannelItem name={"Drop the mic"} />
                <ChannelItem name={"Booo"} />
                <ChannelItem name={"Latest news"} />
            </div>
        </div>
    )
}