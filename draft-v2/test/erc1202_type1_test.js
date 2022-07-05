const ERC1202Type1 = artifacts.require("ERC1202Type1");
const eq = assert.equal.bind(assert);
const truffleAssert = require('truffle-assertions');

const VOTER_INDEX_RANGE = [1, 9];
const ISSUE_INDEX_RANGE = [1, 255];
const OPTION_INDEX_RANGE = [1, 32];

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Type1 ERC1202Core", function (accounts) {
  let erc1202Type1;
  beforeEach(async function(){
    erc1202Type1= await ERC1202Type1.new();
    await ERC1202Type1.deployed();
  });

  let testData = [
    {
      case: "simple #0: 1 voters, 0 options",
      input: [
        { voter: 1, issue: 10, options: [1]},
      ],
      output: [
        { issue: 10, limit: 1, won: [1], }
      ]
    },
    {
      case: "simple #1: 3 voters, 3 options",
      input: [
        { voter: 1, issue:1, options: [1, 2]},
        { voter: 2, issue:1, options: [   2, 3]},
        { voter: 3, issue:1, options: [1, 2]},
      ],
      output: [
        { issue: 1, limit: 1, won: [2], },
        { issue: 1, limit: 2, won: [2, 1 ] },
        { issue: 1, limit: 3, won: [2, 1, 3 ], }
      ]
    },
    {
      case: "simple #2: 1 voters, 2 options",
      input: [
        { voter: 1, issue: 2, options: [1, 2]},
      ],
      output: [
        { issue: 2, limit: 1, won: [], error: "tie" }, // tie will not be output
        { issue: 2, limit: 2, won: [1 , 2]}
      ]
    },
    { 
      case: "complex #3, 4 voters, 10 options",
      input: [
        { voter: 1, issue: 3, options: [1, 2,                      18    ]},
        { voter: 2, issue: 3, options: [1, 2,    6,        15            ]},
        { voter: 3, issue: 3, options: [   2, 3,           15, 16,       ]},
        { voter: 4, issue: 3, options: [      3,    7, 13,             19]},
      ],
      output: [
        { issue: 3, limit: 1, won: [2] },
        { issue: 3, limit: 2, error: "tie" },  // tie will not be output
        { issue: 3, limit: 3, error: "tie" },  // tie will not be output
        { issue: 3, limit: 4, won: [2, 1, 3, 15] },
        { issue: 3, limit: 5, error: "tie" }, // tie will not be output
        { issue: 3, limit: 6, error: "tie" }, // tie will not be output
        { issue: 3, limit: 7, error: "tie" }, // tie will not be output
        { issue: 3, limit: 8, error: "tie" }, // tie will not be output
        { issue: 3, limit: 9, error: "tie" }, // tie will not be output
        { issue: 3, limit: 10, won: [ 2, 
                                      1, 3, 15, 
                                      6, 7, 13, 16, 18, 19]}
      ]
    },
  ]

  let runCase = async (testCase, accounts) => {
    assert(testCase.case, "Case name is missing");
    assert(testCase.input, "Case input is missing");
    assert(testCase.output, "Case output is missing");

    for (let i = 0; i < testCase.input.length; i++) {
      let ballot = testCase.input[i];
      assert(ballot.voter >= VOTER_INDEX_RANGE[0] &&  ballot.voter <= VOTER_INDEX_RANGE[1]);
      assert(ballot.issue >= ISSUE_INDEX_RANGE[0] &&  ballot.issue <= ISSUE_INDEX_RANGE[1]);
      ballot.options.forEach(option => {
        assert(option >= OPTION_INDEX_RANGE[0] &&  option <= OPTION_INDEX_RANGE[1]);
      });
      let voterAccount =  accounts[ballot.voter];
      assert(voterAccount);
      await erc1202Type1.vote(ballot.issue, ballot.options, {from:voterAccount}); // cast the vote
    }
    for (let i = 0; i < testCase.output.length; i++) {
      let result = testCase.output[i];
      assert(result.issue >= ISSUE_INDEX_RANGE[0] &&  result.issue <= ISSUE_INDEX_RANGE[1]);
      let queryResult;
      if (result.error) { // expect error
        try {
          queryResult = (await erc1202Type1.topOptions(result.issue, result.limit));
          throw `We expect an error with reason contains: ${result.error}`;
        } catch(error) {
          eq(error.data.stack.includes(result.error), true);
        }
      } else { // not expecting error
        result.won.forEach(option => {
          assert(option >= OPTION_INDEX_RANGE[0] &&  option <= OPTION_INDEX_RANGE[1]);
        });
        queryResult = (await erc1202Type1.topOptions(result.issue, result.limit));
        let expectedWonArray = result.won;
        let actualWonArray = queryResult.map(bigNum=>bigNum.toNumber());
        let actualWonSet = new Set(actualWonArray);
        let expectedWonSet = new Set(expectedWonArray);
        const areSetsEqual = (a, b) => (
          (a.size === b.size) ? 
          [...a].every( value => b.has(value)) : false
        );
        eq(
          areSetsEqual(actualWonSet, expectedWonSet), true,
          `Winning Options should match with expected. expected=${actualWonArray}, actual=${expectedWonArray}`);
      }
    }
  };

  for(let i = 0; i < testData.length; i++) {
    let testCase = testData[i];
    it(`should correctly yeild topOptions for TestCase @${i} - ${testCase.case}`, async () => await runCase(testCase, accounts));
  }
});

contract("Type1 ERC1202Status", function (accounts) {
  let erc1202Type1;
  beforeEach(async function(){
    erc1202Type1= await ERC1202Type1.new();
    await ERC1202Type1.deployed();
  });
  
  it("all polls are always open", async function() {
    for (let i = 0; i < 256; i++) {
      eq(await erc1202Type1.getStatus(/*issueId*/i), true, '');
    }
  });
  
  it("all polls status are not settable", async function() {
    for (let i = 0; i < 256; i++) {
      try {
        await erc1202Type1.setStatus(/*issueId*/i, true);
        throw "there should be exception when setting status.";
      } catch (error) {
        // expected.
      }
    }
  });

  it("voteOf should work as expectd.", async function() {
    // eq(await erc1202Type1.voteOf(/*issueId*/1, accounts[1]), [0]);
    let account5 = accounts[5];
    await erc1202Type1.vote(/*issueId*/1, /*optionIds*/[3,2,6], {from: account5});
    let results = await erc1202Type1.voteOf(/*issueId*/1, account5);
    eq(results.length, 3);
    eq(results[0], 3);
    eq(results[1], 2);
    eq(results[2], 6);
  });
});

contract("Type1 ERC1202Metadata", function (accounts) {
  let erc1202Type1;
  beforeEach(async function(){
    erc1202Type1= await ERC1202Type1.new();
    await ERC1202Type1.deployed();
  });
  
  it("should have correct Metadata", async function() {
    eq(await erc1202Type1.issueText(1), "placeholder text");
    eq(await erc1202Type1.issueURI(1), "https://pixabay.com/get/gb31bb3a2975f74f66ddd03ae360b14a596ed2e960154939ef812e998d138564b3081e88645bc6c06494eec831213978205fba62fee1f76eccf3727810b7b593af4000c6968ec5e3113b3d9fb76f27cc3_640.jpg");
    eq(await erc1202Type1.optionText(1, 1), "Poll option");
    eq(await erc1202Type1.optionURI(1, 1), "https://example-poll.com/poll_option");
  });
});
