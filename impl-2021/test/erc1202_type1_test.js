const ERC1202Type0 = artifacts.require("ERC1202Type0");
const eq = assert.equal.bind(assert);
const truffleAssert = require('truffle-assertions');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("ERC1202Type0Test ERC1202Core", function (accounts) {
  let erc1202Type0;
  beforeEach(async function(){
    erc1202Type0= await ERC1202Type0.new();
    await ERC1202Type0.deployed();
  });
  
  it("should reject a vote with multiple options or zero options", async function () {
    truffleAssert.fails(erc1202Type0.vote(/*issueId*/1, /*optionIds*/[7, 8], {from: accounts[0]}),
      truffleAssert.ErrorType.REVERT,
        "When voting, only one option is allowed."
    );

    truffleAssert.fails(erc1202Type0.vote(/*issueId*/1, /*optionIds*/[], {from: accounts[0]}),
    truffleAssert.ErrorType.REVERT,
      "When voting, only one option is allowed."
    );
  });

  it("should reject a vote with option larger than 8", async function () {
    truffleAssert.fails(
      erc1202Type0.vote(/*issueId*/1, /*optionIds*/[8], {from: accounts[0]}),
      truffleAssert.ErrorType.REVERT
    );
    truffleAssert.fails(
      erc1202Type0.vote(/*issueId*/1, /*optionIds*/[9], {from: accounts[0]}),
      truffleAssert.ErrorType.REVERT
    );
  });

  it("should handle simple single vote: 7 -> 7", 
  async function () {

    // event OnVote(uint indexed issueId, uint[] optionIds, address indexed voterAddr);
    // Examine an OnVote event is correctly emitted.
    const txRecord = await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[7], {from: accounts[0]});

    eq(txRecord.logs.length, 1);
    eq(txRecord.logs[0].event, "OnVote");
    eq(txRecord.logs[0].args[0].toNumber(), 1); // issueId
    eq(txRecord.logs[0].args[1][0].toNumber(), 7); // [optionId]
    eq(txRecord.logs[0].args[1].length, 1); // optionIds.length
    eq(txRecord.logs[0].args[2], accounts[0]); // voterAddr


    const topOptions = (await erc1202Type0.topOptions(1/*issueId*/, /*limit*/1));
    const wonOption = topOptions[0];
    const wonOptionNum = wonOption.toNumber();
    eq(wonOptionNum, 7);
  });

  it("should handle 3 votes correctly: 7,4,4 -> 4", 
  async function () {
    await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[7], {from: accounts[0]});
    await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[4], {from: accounts[1]});
    await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[4], {from: accounts[2]});
    const topOptions = (await erc1202Type0.topOptions(1/*issueId*/, /*limit*/1));
    const wonOption = topOptions[0];
    const wonOptionNum = wonOption.toNumber();
    eq(wonOptionNum, 4);
  });

  it("should allow one to change votes: from 1 voter: 7then4then5 -> 5", 
  async function () {
    await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[7], {from: accounts[0]});
    await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[4], {from: accounts[0]});
    await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[5], {from: accounts[0]});
    // all from the same voter account 0

    const topOptions = (await erc1202Type0.topOptions(1/*issueId*/, /*limit*/1));
    const wonOption = topOptions[0];
    const wonOptionNum = wonOption.toNumber();
    eq(wonOptionNum, 5);
  });

  it("should a complex voting scenario", 
  async function () {
    
    // Account 0 voted and change their minds for issue 1 option 5
    await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[7], {from: accounts[0]});
    await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[4], {from: accounts[0]});
    await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[5], {from: accounts[0]});

    // Account 1 voted and change their minds for issue 1 option 1
    await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[1], {from: accounts[1]});

    // Account 2 voted and change their minds for issue 1 option 3
    // currently votes are {5, 1, 3}
    await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[3], {from: accounts[2]});

    // Account 3 voted and change their minds for issue 1 option 3
    // currently votes are {5, 1, 3, 5}
    await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[5], {from: accounts[3]});

    // Account 4 voted and change their minds for issue 1 option 3
    // currently votes are {5, 1, 3, 5, 3}
    await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[3], {from: accounts[4]});

    // Account 5 voted and change their minds for issue 1 option 3
    // currently votes are {5, 1, 3, 5, 3, 3}
    await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[3], {from: accounts[5]});

    const topOptions = (await erc1202Type0.topOptions(1/*issueId*/, /*limit*/1));
    const wonOption = topOptions[0];
    const wonOptionNum = wonOption.toNumber();
    eq(wonOptionNum, 3);
  });
});

contract("ERC1202Type0Test ERC1202Status", function (accounts) {
  let erc1202Type0;
  beforeEach(async function(){
    erc1202Type0= await ERC1202Type0.new();
    await ERC1202Type0.deployed();
  });
  
  it("all polls are always open", async function() {
    for (let i = 0; i < 256; i++) {
      eq(await erc1202Type0.getStatus(/*issueId*/i), true, '');
    }
  });
  
  it("all polls status are not settable", async function() {
    for (let i = 0; i < 256; i++) {
      try {
        await erc1202Type0.setStatus(/*issueId*/i, true);
        throw "there should be exception when setting status.";
      } catch (error) {
        // expected.
      }
    }
  });

  it("voteOf should work as expectd.", async function() {
    // eq(await erc1202Type0.voteOf(/*issueId*/1, accounts[1]), [0]);
    let account5 = accounts[5];
    await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[3], {from: account5});
    let results = await erc1202Type0.voteOf(/*issueId*/1, account5);
    eq(results.length, 1);
    eq(results[0], 3);
  });
});

contract("ERC1202Type0Test ERC1202Metadata", function (accounts) {
  let erc1202Type0;
  beforeEach(async function(){
    erc1202Type0= await ERC1202Type0.new();
    await ERC1202Type0.deployed();
  });
  
  it("should have correct Metadata", async function() {
    eq(await(erc1202Type0.issueText(1), "placeholder text"));
    // eq(await(erc1202Type0.issueURI(1), "https://pixabay.com/get/gb31bb3a2975f74f66ddd03ae360b14a596ed2e960154939ef812e998d138564b3081e88645bc6c06494eec831213978205fba62fee1f76eccf3727810b7b593af4000c6968ec5e3113b3d9fb76f27cc3_640.jpg"));
    // eq(await(erc1202Type0.optionText(1, 1), "Poll option"));
    // eq(await(erc1202Type0.optionURI(1, 1), "https://example-poll.com/poll_option"));
  });
});
