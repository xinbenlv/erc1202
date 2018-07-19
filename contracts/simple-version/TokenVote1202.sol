pragma solidity ^0.4.22;

import "./InterfaceErc1202.sol";

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/BasicToken.sol";


/**
  A simplest (frozen) token vote interface.
  (1) single issue
  (2) only TRUE or FALSE
  (3) no voting time limit, and ok to change vote
  (4) each address has a weight equal to the Token held by given address at the time of token construction.
  It makes assumption that during the time of voting, the holding state of the token contract, i.e. the balanceOf
  is being frozen.
 */
contract TokenVote1202 is InterfaceErc1202 {
    uint[] internal options;
    bool internal isOpen;
    mapping (address => uint256) internal weights;
    mapping (uint => uint256) internal weightedVoteCounts;
    mapping (address => uint) internal  ballots;

    /**
        tokenContract: address to a smart contract of the OpenZeppelin BasicToken or
                       any ERC-basic token supporting accessing to balances
     */
    constructor(
        address _tokenAddr, uint[] _options,
        address[] qualifiedVoters) public {
        require(options.length >= 2);
        options = _options;
        BasicToken token = BasicToken(_tokenAddr);

        // We realize the ERC20 will need to be extended to support snapshoting the weights/balances.
        for (uint i = 0; i < qualifiedVoters.length; i++) {
            address voter = qualifiedVoters[i];
            weights[voter] = token.balanceOf(voter);
        }
    }

    /* Send coins */
    function vote(uint option) external returns (bool success) {
        require(isOpen);
        // TODO check if option is valid

        uint256 weight = weights[msg.sender];
        weightedVoteCounts[option] += weight;  // initial value is zero
        ballots[msg.sender] = option;
        emit OnVote(msg.sender, option);
        return true;
    }

    function setStatus(bool isOpen_) external returns (bool success) {
        isOpen = isOpen_;
        emit OnStatusChange(isOpen_);
        return true;
    }

    function ballotOf(address addr) external view returns (uint option) {
        return ballots[addr];
    }

    function weightOf(address addr) external view returns (uint weight) {
        return weights[addr];
    }

    function getStatus() external view returns (bool isOpen_) {
        return isOpen;
    }

    function weightedVoteCountsOf(uint option) external view returns (uint count) {
        return weightedVoteCounts[option];
    }

    function winningOption() external view returns (uint option) {
        uint currentWiningOptionIndex = 0;
        for (uint i = 1; i <= options.length; i++) {
            if (weightedVoteCounts[options[i]] >= weightedVoteCounts[options[currentWiningOptionIndex]]) {
                currentWiningOptionIndex = i;
            }
        }
        return options[currentWiningOptionIndex];
    }

    event OnVote(address indexed _from, uint _value);
    event OnStatusChange(bool newIsOpen);

}