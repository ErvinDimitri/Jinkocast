var RegisterCont = artifacts.require("RegisterContract");

module.exports = function(_deployer) {
  _deployer.deploy(RegisterCont);
};
