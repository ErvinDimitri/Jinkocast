import React from "react"
import Settings from "@material-ui/icons/Settings"
import Profile from "@material-ui/icons/Person"
import Search from "@material-ui/icons/SearchRounded"

export const NavBtn = ()=>{

    return(
        <div className={"NavBTN"}>
            <Search fontSize={"large"} />
            <Profile fontSize={"large"} />
            <Settings fontSize={"large"} />
        </div>
    )
}