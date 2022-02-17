import React from "react"

export const Text= ({text, className})=>{
    return(
        <p className={className}>
        {
            text.length <10 ? text : text.substring(0,10).concat("...")
        }
        </p>
    )
}