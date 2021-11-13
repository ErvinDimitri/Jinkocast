// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract RegisterContract{
    address public owner;
    mapping (address => Podcast[]) public podsFromArtist;

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
        Podcast memory pc = Podcast(_name, now, _content);
        podsFromArtist[msg.sender].push(pc);
        emit NewPodcast( msg.sender, _name, _content, now);
        return true;
    }
}
