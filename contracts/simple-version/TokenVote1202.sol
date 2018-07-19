pragma solidity ^0.4.22;

import "./InterfaceErc1202.sol";
import "./SampleToken.sol";

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
contract TokenVote1202 {
    uint[] internal options;
    bool internal isOpen;
    mapping (address => uint256) public weights;
    mapping (uint => uint256) public weightedVoteCounts;
    mapping (address => uint) public  ballots;
    SampleToken token;

    /**
        tokenContract: address to a smart contract of the OpenZeppelin BasicToken or
                       any ERC-basic token supporting accessing to balances
     */
    function init(address _tokenAddr, uint[] _options,
        address[] qualifiedVoters_) public {
        require(_options.length >= 2);
        options = _options;
        token = SampleToken(_tokenAddr);
        isOpen = true;
        // We realize the ERC20 will need to be extended to support snapshoting the weights/balances.
        for (uint i = 0; i < qualifiedVoters_.length; i++) {
            address voter = qualifiedVoters_[i];
            weights[voter] = token.balanceOf(voter);
        }
    }

    function vote(uint option) public returns (bool success) {
        require(isOpen);
        // TODO check if option is valid

        uint256 weight = weights[msg.sender];
        weightedVoteCounts[option] += weight;  // initial value is zero
        ballots[msg.sender] = option;
        emit OnVote(msg.sender, option);
        return true;
    }

    function setStatus(bool isOpen_) public returns (bool success) {
        // Should have a sense of ownership. Only Owner should be able to set the status
        isOpen = isOpen_;
        emit OnStatusChange(isOpen_);
        return true;
    }

    function ballotOf(address addr) public view returns (uint option) {
        return ballots[addr];
    }

    function weightOf(address addr) public view returns (uint weight) {
        return weights[addr];
    }

    function getStatus() public view returns (bool isOpen_) {
        return isOpen;
    }

    function weightedVoteCountsOf(uint option) public view returns (uint count) {
        return weightedVoteCounts[option];
    }

    function winningOption() public view returns (uint option) {
        uint ci = 0;
        for (uint i = 1; i < options.length; i++) {
            uint optionI = options[i];
            uint optionCi = options[ci];
            if (weightedVoteCounts[optionI] > weightedVoteCounts[optionCi]) {
                ci = i;
            } // else keep it there
        }
        return options[ci];
    }

    event OnVote(address indexed _from, uint _value);
    event OnStatusChange(bool newIsOpen);
    event DebugMsg(string msg);

}