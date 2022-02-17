import React, {useState} from "react"
import Button from "@material-ui/core/Button"

export const ButtonControl = ({icon0, icon1, onClick, type})=>{
    let [_type, setType] = useState(false);
    
    const handle = ()=>{
        if(type === "previous" || type === "next"){
            setType(true)
            onClick(type, true)
        }else{
            setType(!_type);
            onClick(type, !_type);
        }
    }

    return(
        <Button 
            className={type+"BTN"}
            onClick={handle}
        >
            {
                _type?
                    icon0:
                    icon1
            }
        </Button>
    )
}