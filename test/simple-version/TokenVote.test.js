const SampleToken = artifacts.require("./simple-version/SampleToken.sol");
const TokenVote1202 = artifacts.require("./simple-version/TokenVote1202.sol");

const eq = assert.equal.bind(assert);

contract("TokenVote1202", function(accounts) {
  let sampleToken, tokenVote1202;
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];

  const deploy = async function (cut = 0) {
    sampleToken = await SampleToken.new();
    await sampleToken.transfer(user1, 19);
    await sampleToken.transfer(user2, 29);
    tokenVote1202 = await TokenVote1202.new();
    await tokenVote1202.init(sampleToken.address, [1, 2, 3], [owner, user1, user2]);
  };

  describe("Initial State", function () {
    beforeEach(deploy);

    it("should carries the weights initialized by sampleToken", async function () {
      const balance = await sampleToken.balanceOf(owner);
      eq(balance, 52);
      const weight = await tokenVote1202.weightOf(owner);
      eq(weight, 52);
      eq(await tokenVote1202.weightOf(user1), 19);
      eq(await tokenVote1202.weightOf(user2), 29);
    });

    it("should handle the weight and winning options through weight", async function() {
      eq(await tokenVote1202.winningOption(), 1);
      await tokenVote1202.vote(2, {from: user1});
      eq(await tokenVote1202.winningOption(), 2);
      await tokenVote1202.vote(3, {from: user2});
      eq(await tokenVote1202.winningOption(), 3);
      await tokenVote1202.vote(2, {from: user2});
      eq(await tokenVote1202.winningOption(), 2);
      await tokenVote1202.vote(1, {from: owner});
      eq(await tokenVote1202.winningOption(), 1);

    });
  });
});