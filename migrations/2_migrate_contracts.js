const SimplestVote1202 = artifacts.require("./v2-single-issue-single-election-status-settable/SimplestVote1202.sol");

module.exports = function(deployer) {
  deployer.deploy(SimplestVote1202);
};
