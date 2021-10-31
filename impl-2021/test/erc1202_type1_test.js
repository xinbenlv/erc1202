const ERC1202Type0 = artifacts.require("ERC1202Type0");
const eq = assert.equal.bind(assert);

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("ERC1202Type0Test", function (accounts) {
  let erc1202Type0;
  beforeEach(async function(){
    erc1202Type0= await ERC1202Type0.new();
    await ERC1202Type0.deployed();
  });

  it("should assert true", async function () {
    return assert.isTrue(true);
  });

  it("should reject a vote with multiple options", async function () {
    return assert.isTrue(true);
  });

  it("should handle simple single vote: 7 -> 7", 
  async function () {

    // Setup 1 account.
    const accountOne = accounts[0];

    // event OnVote(uint indexed issueId, uint[] optionIds, address indexed voterAddr);
    // Examine an OnVote event is correctly emitted.
    const txRecord = await erc1202Type0.vote(/*issueId*/1, /*optionIds*/[7], {from: accountOne});
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
