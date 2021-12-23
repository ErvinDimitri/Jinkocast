import React, {useState, useReducer, useRef} from "react";
import "../assets/scss/Upload.scss"

const formReducer = (state, event) =>{
    return{
        ...state,
        [event.name]: event.value
    }
}

export const Upload = ()=>{

    const [uploading, setUploadig] = useState(false);
    const [formData, setFormData] = useReducer(formReducer);

    const uploadHandle = event=>{
        event.preventDefault();
        setUploadig(true);
        setInterval(()=>{
            setUploadig(false);
            console.log(formData);
            alert("Boooomm");
        }, 3000);
    };

    const changeHandle = event=>{
        let isText = event.target.type === "text" ? event.target.value : event.target.files[0];
        // let val = ()=>{
        //     switch(){
        //         case "textarea": return(event.target.value);
        //         case "file": return(event.target.files[0]);
        //         default: return(event.target.value);
        //     }
        // }
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
