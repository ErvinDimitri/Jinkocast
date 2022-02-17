import React from "react"
import Settings from "@material-ui/icons/Settings"
import Profile from "@material-ui/icons/Person"
import Search from "@material-ui/icons/SearchRounded"
import {Link} from "react-router-dom";

export const NavBtn = ()=>{

    return(
        <div className={"NavBTN"}>
            <Search className={"searchBTN"}  fontSize={"large"} style={{color:" #00f2ff"}}/>
            <Link to={"/account"}>
                <Profile className={"profileBTN"}  fontSize={"large"} style={{color:" #00f2ff"}}/>
            </Link>
            <Settings  className={"settingsBTN"} fontSize={"large"} style={{color:" #00f2ff"}} />
        </div>
    )
}