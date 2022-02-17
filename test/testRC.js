const regisCont = artifacts.require("../contracts/RegisterContract.sol");

contract("RegisterContract", accounts=>{
    it("Should return the owner of the contract", async ()=>{
        const regContract = await regisCont.deployed();
    
        // const upload = await regisCont
        const deployer = await regContract.owner.call();
        assert.equal(deployer, accounts[0], "Confirmed");

    })
})