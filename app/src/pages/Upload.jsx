import React, {useState, useReducer, useRef, useEffect} from "react";
import { newContextComponents } from "@drizzle/react-components";
import "../assets/scss/Upload.scss"
import {create} from 'ipfs-http-client'

const { AccountData, ContractData, ContractForm } = newContextComponents;
export const Upload = ({ drizzle, drizzleState })=>{

    const [uploading, setUploadig] = useState(false);
    const [formData, setFormData] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [thumbnail_0, setThumbnail_0] = useState("");
    const [podIPFS, setPodIPFS] = useState("");
    const [podIPFS_0, setPodIPFS_0] = useState("");
    const [cid, setCID] = useState("");

    async function uploadIPFS (data){
        const upload = await client.add(data);
        return upload.path;
    }

    const IPFS_hash = ()=>{
        async function exec(){
            const currentDate = new Date();
            let data={
                title: event.target.title.value,
                type: event.target.typePodcast.value,
                description: event.target.description.value,
                date: currentDate.getTime(),
                imgCID:await uploadIPFS( thumbnail_0),
                podCID: await uploadIPFS( podIPFS_0)
            }
            setCID(await uploadIPFS(JSON.stringify(data)));
        }
    } 
    const uploadHandle = event=>{
        event.preventDefault();
        let id = drizzle.contracts.RegisterContract.methods.newPodcast.cacheSend(
            event.target.title.value,
            cid,
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
        if(drizzleState.transactionStack[id]){ // Verify if the Tx was successed
            const txHash=drizzleState.transactionStack[id];
            console.log(drizzleState.transactions[txHash].status)
        }
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
