// SPDX-License-Identifier: MIT
// pragma solidity 0.7.2;
pragma experimental ABIEncoderV2;

contract RegisterContract{
    address public owner;
    mapping (address => Podcast[]) public podsFromArtist;

    mapping (address => uint) public count;

    struct Podcast{
        string name;
        uint uploadTime; 
        string content;
    }

    event NewPodcast( address indexed creator, string name, string content, uint time);
    constructor() public{
        owner=msg.sender;
    } 

    function newPodcast(string memory _name, string memory _content) public returns( bool isSuccessed){
        Podcast memory pc = Podcast(_name, block.timestamp, _content);
        podsFromArtist[msg.sender].push(pc);
        emit NewPodcast( msg.sender, _name, _content, block.timestamp);
        isSuccessed = true;
    }

    function allPodcastsFromArtist(address _account)public view returns(string [] memory){
        Podcast [] memory pc = podsFromArtist[_account];
        string [] memory data = new string[](2);
        // data = [pc.name, string(pc.uploadTime),pc.content];
        data[0] = pc[0].name;
        // data[1] = ""+pc.uploadTime;
        data[1] = pc[0].content;
        return data;
    }
}
