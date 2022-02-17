import {create} from 'ipfs-http-client'

const binArrayToJson = function(binArray)
{
    var str = "";
    for (var i = 0; i < binArray.length; i++) {
        str += String.fromCharCode(parseInt(binArray[i]));
    }
    return JSON.parse(str)
};

export async function getContent(hash){
    const client = create('https://ipfs.infura.io:5001/api/v0');
    let chunks, inf;
    for await (const chunk of client.cat(hash)) {
        chunks = binArrayToJson(chunk);
      }
      
    Promise.all([chunks]).then((info)=>
        inf= info

    )
    return chunks;
}