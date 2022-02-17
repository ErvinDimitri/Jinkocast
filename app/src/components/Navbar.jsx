import React from "react"
import Menu from "@material-ui/icons/Menu"
import {Logo} from "./Logo"
import { NavBtn } from "./NavBtn"
import "../assets/scss/Navbar.scss"

export const Navbar = ()=>{

    return(
        <div className={"Navbar"}>
            <div className={"menuBtn1"}>
                <Menu fontSize={"large"} className={"MenuBtn"} style={{color:" #00f2ff"}}/>
            </div>
            <Logo />
            <NavBtn />
        </div>
    )
}