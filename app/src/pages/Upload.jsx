import React, {useState, useReducer, useRef, useEffect} from "react";
import { newContextComponents } from "@drizzle/react-components";
import "../assets/scss/Upload.scss"
import {create} from 'ipfs-http-client'

const { AccountData, ContractData, ContractForm } = newContextComponents;
const client = create('https://ipfs.infura.io:5001/api/v0');

export const Upload = ({ drizzle, drizzleState })=>{

    const [uploading, setUploadig] = useState(false);
    const [formData, setFormData] = useState("");]
    const [thumbnail, setThumbnail] = useState("");
    const [thumbnail_0, setThumbnail_0] = useState("");
    const [podIPFS, setPodIPFS] = useState("");
    const [podIPFS_0, setPodIPFS_0] = useState("");
    const [cid, setCID] = useState("");

    async function uploadIPFS (data){
        
        const upload = await client.add(data);
        const url = `https://ipfs.infura.io/ipfs/${upload.path}`
        return upload.path;
    }

    async function sendToSmartCOntract(title, hash){
        let id = await drizzle.contracts.RegisterContract.methods.newPodcast.cacheSend(
            title,
            hash,
            {
                from: drizzleState.accounts[0],
                gas:5000000
            }
        )
        if(drizzleState.transactionStack[id]){  // Verify if the Tx was successed
            const txHash=drizzleState.transactionStack[id];
            console.log(drizzleState.transactions[txHash].status)
        }
    }

    const uploadHandle = event=>{
        event.preventDefault();
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
            let cidCont = await uploadIPFS(JSON.stringify(data)); 
            console.log(cidCont)
            sendToSmartCOntract(data.title, cidCont)
        }
        
        exec()
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

    const onChangeImg=(e)=>{
        const file = e.target.files[0];
        setPodIPFS(file);
    }

    const uploadThumbnail = (e)=>{
        setThumbnail_0(e.target.files[0])
    }
    const uploadPod = (e)=>{
        setPodIPFS_0( e.target.files[0]);
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
                        <input type="file" name={"audio"} onChange={uploadPod}/>
                    </label>
                    <label>
                        <p>Upload Thumbnail</p>
                        <input type={"file"} name={"thumbnail"} onChange={uploadThumbnail}/>
                    </label>

                    <input type={"submit"} value={"Upload"} />
                    {
                        uploading&& <h1> ...Uploading the data... It may take a while </h1>
                    }
                    {thumbnail}
                </form>
            </div>
        </div>
    )
}
