const ERC1202Type0 = artifacts.require("ERC1202Type0");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("ERC1202Type0Test", function (/* accounts */) {
  it("should assert true", async function () {
    await ERC1202Type0.deployed();
    return assert.isTrue(true);
  });
});
