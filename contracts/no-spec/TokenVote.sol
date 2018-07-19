pragma solidity ^0.4.22;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";


/**
  A simplest (frozen) token vote interface.
  (1) single issue
  (2) only TRUE or FALSE
  (3) no voting time limit, and ok to change vote
  (4) each address has a weight equal to the Token held by given address at the time of token construction.
  It makes assumption that during the time of voting, the holding state of the token contract, i.e. the balanceOf
  is being frozen.
 */
contract TokenVote {
    mapping(address => uint256) public ballots;
    mapping(uint256/*option*/ => uint256/*weight*/) public currentVotes;  // mapping from
    uint256[] public options;
    ERC20 erc20;

    /**
        tokenContract: address to the ERC20 compatible token
     */
    constructor(address _erc20Addr, uint256[] _options) public {
        require(options.length >= 2);
        options = _options;
        erc20 = ERC20(_erc20Addr);
    }

    /* Send coins */
    function vote(uint256 value) public {
        // TODO require(options.contains(value));

        // DISCUSSION: there is a big caveat in this implementation:
        //   the token contract will always be the current token holding state (i.e. balanceOf). But to make sure no
        //   one cheats, the token holding state needs to static, either frozen or snapshot.
        //   There is currently no weight to make a snapshot of a ERC20 token based on the interface, unless extended.
        // For simplicity, we assume the ERC20 holding is frozen
        //   a the time for voting.
        uint256 weight = erc20.balanceOf(msg.sender);
        ballots[msg.sender] = value;
        currentVotes[value] += weight;  // initial value is zero
    }

    function getMostVoteResult() public view returns(uint256 result/*option that gets most votes*/) {
        uint256 currentMostVotedOption = 0;
        for (uint i = 1; i < options.length; i++) { // options.length >= 2
            if (currentVotes[options[i]] > currentVotes[options[currentMostVotedOption]])
                currentMostVotedOption = i;
        }
        return options[currentMostVotedOption];
    }

}