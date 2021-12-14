import React from "react"
import Menu from "@material-ui/icons/Menu"
import {Logo} from "./Logo"
import { NavBtn } from "./NavBtn"

export const Navbar = ()=>{

    return(
        <div className={"Navbar"}>
            <Menu fontSize={"large"} />
            <Logo />
            <NavBtn />
        </div>
    )
}