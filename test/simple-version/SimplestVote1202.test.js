const SimplestVote1202 = artifacts.require("./simple-version/SimplestVote1202.sol");

const eq = assert.equal.bind(assert);

contract("SimplestVote1202", async function(accounts) {
  require('truffle-test-utils').init();
  let simplestVote1202;
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  const user3 = accounts[4];

  const deploy = async function (cut = 0) {
    simplestVote1202 = await SimplestVote1202.new();
  };

  describe("behavior", function () {
    beforeEach(deploy);

    it("should has correct initial states", async function () {
      eq(await simplestVote1202.weightOf(owner), 1);
      eq(await simplestVote1202.weightOf(user1), 1);
      eq(await simplestVote1202.weightOf(user2), 1);
      eq(await simplestVote1202.weightOf(user3), 1);

      eq(await simplestVote1202.ballotOf(owner), 0);
      eq(await simplestVote1202.ballotOf(user1), 0);
      eq(await simplestVote1202.ballotOf(user2), 0);
      eq(await simplestVote1202.ballotOf(user3), 0);

      eq(await simplestVote1202.winningOption(), 1);
    });

    it("should let option 2 win if more people voted on it", async function () {
      eq(await simplestVote1202.weightedVoteCountsOf(1), 0);
      eq(await simplestVote1202.weightedVoteCountsOf(2), 0);
      eq(await simplestVote1202.ballotOf(owner), 0);

      await simplestVote1202.vote(1, {from : owner});

      eq(await simplestVote1202.ballotOf(owner), 1);
      eq(await simplestVote1202.weightedVoteCountsOf(1), 1);
      eq(await simplestVote1202.weightedVoteCountsOf(2), 0);
      eq(await simplestVote1202.winningOption(), 1);
      eq(await simplestVote1202.ballotOf(user1), 0);

      await simplestVote1202.vote(2, {from : user1});

      eq(await simplestVote1202.ballotOf(user1), 2);
      eq(await simplestVote1202.weightedVoteCountsOf(1), 1);
      eq(await simplestVote1202.weightedVoteCountsOf(2), 1);
      eq(await simplestVote1202.winningOption(), 1);
      eq(await simplestVote1202.ballotOf(user2), 0);

      await simplestVote1202.vote(2, {from : user2});

      eq(await simplestVote1202.ballotOf(user2), 2);
      eq(await simplestVote1202.weightedVoteCountsOf(1), 1);
      eq(await simplestVote1202.weightedVoteCountsOf(2), 2);
      eq(await simplestVote1202.winningOption(), 2);
    });
  });
});