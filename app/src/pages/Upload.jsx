import React, {useState, useReducer, useRef} from "react";
import { newContextComponents } from "@drizzle/react-components";
import "../assets/scss/Upload.scss"

const formReducer = (state, event) =>{
    return{
        ...state,
        [event.name]: event.value
    }
}
const { AccountData, ContractData, ContractForm } = newContextComponents;

export const Upload = ({ drizzle, drizzleState })=>{

    const [uploading, setUploadig] = useState(false);
    const [formData, setFormData] = useReducer(formReducer);

    const uploadHandle = event=>{
        event.preventDefault();
        const state = drizzle.store.getState();
        let id = drizzle.contracts.RegisterContract.methods.newPodcast.cacheSend(
            "The Pods House",
            "zvre223",
            {
                from: drizzleState.accounts[0],
                gas:5000000
            }
        )

        if(id>0){
            id -=1;
        }else{
            let id = drizzle.contracts.RegisterContract.methods.newPodcast.cacheSend(
                "The Pods House",
                "zvre223",
                {
                    from: drizzleState.accounts[0],
                    gas:5000000
                }
            )
        }
        if(drizzleState.transactionStack[id]){
            const txHash=drizzleState.transactionStack[id];
            console.log(drizzleState.transactions[txHash].status)
        }
        drizzle.contracts.RegisterContract.methods.allPodcastsFromArtist(
            drizzleState.accounts[0]
        ).call()
            .then((data)=>{
                console.log(data);
            })
        
    };

    const changeHandle = event=>{
        let isText = "";
        
            switch(event.target.type){
                case "file": isText = event.target.files[0]; break;
                default: isText = event.target.value;
            }

        setFormData({
            name: event.target.name,
            value: isText,
        })
    }



    return(
        <div className={"UploadDIV"}>
            <div className={"UploadTitleDIV"}>
                <p>Upload PodCast</p>
            </div>
            <div className={"FormDIV"}>
                <form method={"POST"} onSubmit={uploadHandle} >
                    
                    <label>
                        <p>Title</p>
                        <input type={"text"} name={"title"} onChange={changeHandle} />
                    </label>
                    <label>
                        <p>Type</p>
                        <select name={"typePodcast"} onChange={changeHandle}>
                            <option value={""}>---</option>
                            <option value={"entrateiment"}>entrateiment</option>
                            <option value={"crypto"}>Crypto in general</option>
                            <option value={"nft"}>NFT</option>
                            <option value={"metaverse"}>Metaverse</option>
                            <option value={"education"}>Education</option>
                            <option value={"other"}>other</option>
                        </select>
                    </label>
                    <label>
                        <p>Description</p>
                        <textarea name={"description"} onChange={changeHandle} rows="4" cols="45"/>
                    </label>
                    <label>
                        <p>Upload Audio</p>
                        <input type="file" name={"audio"} />
                    </label>
                    <label>
                        <p>Upload Thumbnail</p>
                        <input type={"file"} name={"thumbnail"} />
                    </label>

                    <input type={"submit"} value={"Upload"} />
                    {
                        uploading&& <h1> ...Uploading the data... It may take a while </h1>
                    }
                </form>
            </div>
        </div>
    )
}
