const BasicErc20Token = artifacts.require("./BasicErc20Token.sol");
const AdvancedTokenVote1202 = artifacts.require("./advanced-version/AdvancedTokenVote1202.sol");

const eq = assert.equal.bind(assert);

contract("AdvancedTokenVote1202", function(accounts) {
  let basicErc20Token, advancedTokenVote1202;
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];

  const deploy = async function (cut = 0) {
    basicErc20Token = await BasicErc20Token.new();
    await basicErc20Token.transfer(user1, 19);
    await basicErc20Token.transfer(user2, 29);
    advancedTokenVote1202 = await AdvancedTokenVote1202.new();
    await advancedTokenVote1202.createIssue(
          0, basicErc20Token.address, [1, 2, 3], [owner, user1, user2]
          , 'Issue 0: should we issue more tokens?'
      );

    await advancedTokenVote1202.createIssue(
        1, basicErc20Token.address, [1, 2], [owner, user1, user2],
        'Issue 1: should we transfer our kitty to another DAO?');
  };

  describe("behavior", function () {
    beforeEach(deploy);

    it("should carries the weights initialized by basicErc20Token", async function () {
      const balance = await basicErc20Token.balanceOf(owner);
      eq(balance, 52);
      const weight = await advancedTokenVote1202.weightOf(0, owner);
      eq(weight, 52);
      eq(await advancedTokenVote1202.weightOf(0, user1), 19);
      eq(await advancedTokenVote1202.weightOf(0, user2), 29);
    });

    it("should handle the weight and winning options through weight", async function() {
      eq(await advancedTokenVote1202.winningOption(0), 1);
      await advancedTokenVote1202.vote(0, 2, {from: user1});
      eq(await advancedTokenVote1202.winningOption(0), 2);
      await advancedTokenVote1202.vote(0, 3, {from: user2});
      eq(await advancedTokenVote1202.winningOption(0), 3);
      await advancedTokenVote1202.vote(0, 2, {from: user2});
      eq(await advancedTokenVote1202.winningOption(0), 2);
      await advancedTokenVote1202.vote(0, 1, {from: owner});
      eq(await advancedTokenVote1202.winningOption(0), 1);

      eq(await advancedTokenVote1202.winningOption(1), 1);
      await advancedTokenVote1202.vote(1, 2, {from: user1});
      eq(await advancedTokenVote1202.winningOption(1), 2);
      await advancedTokenVote1202.vote(1, 1, {from: user2});
      eq(await advancedTokenVote1202.winningOption(1), 1);
      await advancedTokenVote1202.vote(1, 2, {from: user2});
      eq(await advancedTokenVote1202.winningOption(1), 2);
      await advancedTokenVote1202.vote(1, 1, {from: owner});
      eq(await advancedTokenVote1202.winningOption(1), 1);

    });
  });
});