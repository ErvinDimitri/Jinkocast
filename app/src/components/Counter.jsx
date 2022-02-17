import React from "react"

export const Counter = ({number, unit})=>{
    const converter = ()=>{
        let result=""
        if(number < 1000){
            result = ""+number
        }else if(number < 1000000){
            result = ""+number;
            result=result.substring(0,2)+"k"
        }else if(number < 1000000000){
            result = ""+number;
            result=result.substring(0,2)+"M"
        }
        return result
    }
    return(
        <p>
            {converter(number)}{ unit}
        </p>
    )
}