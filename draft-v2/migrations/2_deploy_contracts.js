const ERC1202Type0 = artifacts.require("ERC1202Type0");
const ERC1202Type1 = artifacts.require("ERC1202Type1");
const ERC1202Type2 = artifacts.require("ERC1202Type2");

module.exports = function(deployer) {
  deployer.deploy(ERC1202Type0);
  deployer.deploy(ERC1202Type1);
  deployer.deploy(ERC1202Type2);
};
