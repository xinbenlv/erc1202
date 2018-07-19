const SimplestVote1202 = artifacts.require("./simple-version/SimplestVote1202.sol");
const TokenVote1202 = artifacts.require("./simple-version/TokenVote1202.sol");


module.exports = function(deployer) {
  // deployer.deploy(SimplestVote1202);
  deployer.deploy(TokenVote1202, 0xeDEad5bfc853363ae55d52ce34A9BCf7800829aA, [1, 2, 3],
      [
          0x8d012fa42370add6268b547d955eef603c89821a,
          0x819caa13f9b5211167ef696aa7ddadd9ea3bb1eb,
          0x904ae54da181e6d79b3b1232f50dfa2dbf42fb2c
      ]);
};
