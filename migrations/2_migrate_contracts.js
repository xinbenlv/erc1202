const SimplestVote1202 = artifacts.require("./simple-version/SimplestVote1202.sol");
// const BasicErc20Token = artifacts.require("./BasicErc20Token.sol");
// const TokenVote1202 = artifacts.require("./simple-version/TokenVote1202.sol");
//
// const AdvancedTokenVote1202 = artifacts.require("./advanced-version/AdvancedTokenVote1202.sol");

module.exports = async function(deployer) {

  //deployer.deploy(SimplestVote1202);

  // const devAccounts =       [
  //   0xd73A01C4b9D7175EFa05f414E757e75fc1e14b9F,
  //   0x168fbF3566166A088ca6D392F00087197DccBD02,
  //   0xA791c85dF0CC0866dddDF5dCfC2dda639dFA83Bf
  // ];
  //
  // await deployer.deploy(BasicErc20Token);
  // // await deployer.deploy(TokenVote1202);
  // // tokenVote1202 = await TokenVote1202.deployed();
  // // await tokenVote1202.init(SampleToken.address, [1, 2, 3], devAccounts);
  //
  // await deployer.deploy(AdvancedTokenVote1202);
  // advancedTokenVote1202 = await AdvancedTokenVote1202.deployed();
  // await advancedTokenVote1202.createIssue(BasicErc20Token.address, [1, 2, 3], devAccounts, 'Issue 0: should we issue more tokens?');
};
