import React from "react"
import {Link} from "react-router-dom"
import "../assets/scss/Logo.scss"

export const Logo = ()=>{
    return(
        <div className={"Logo"}>
            <Link to={"/"}>
                <img src={ require("../assets/img/JKLogo.png")} />
            </Link>
        </div>
    )
}