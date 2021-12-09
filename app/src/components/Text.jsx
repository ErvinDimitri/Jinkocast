import React from "react"

export const Text= ({text})=>{
    return(
        <p>
        {
            text.length <10 ? text : text.substring(0,10).concat("...")
        }
        </p>
    )
}