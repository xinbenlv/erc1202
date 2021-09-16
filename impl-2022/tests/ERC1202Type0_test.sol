// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "../contracts/ERC1202Type0.sol";

contract ERC1202Type0Test {

    ERC1202Type0 underTest;
    function beforeAll () public {
        underTest = new ERC1202Type0();
    }
    
    function checkWinningOption() public {
        uint[] memory votedOptions = new uint[](1);
        votedOptions[0] = 1;
        underTest.vote(0, votedOptions);
        uint[] memory topOptions = underTest.topOptions(0, 0);
        Assert.equal(topOptions[0], 1, "proposal at index 0 should be the winning proposal");
    }
}
