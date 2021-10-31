const EIP1202Type1Test = artifacts.require("EIP1202Type1Test");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("EIP1202Type1Test", function (/* accounts */) {
  it("should assert true", async function () {
    await EIP1202Type1Test.deployed();
    return assert.isTrue(true);
  });
});
