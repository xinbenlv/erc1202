pragma solidity ^0.5.8;


/**
  A simplest vote interface.
  (1) single issue
  (2) only 1 or 2 as the vote option
  (3) no voting time limit
  (4) each address can only vote once.
  (5) each address has the same weight.
  Deployed on [Etherscan:Ropsten](https://ropsten.etherscan.io/address/0xec27791163cd27229d4d54ee69faf5a70058d90b#code)
 */
contract SimplestVote1202 {
    uint[] options = [1, 2];
    mapping(uint => string) internal optionDescMap;
    mapping (uint => uint) private voteCounts;
    mapping (address => uint) private ballotOf_;

    constructor() public {
        optionDescMap[1] = "Yes";
        optionDescMap[2] = "No";
    }

    function vote(uint option) public returns (bool success) {
        require(option == 1 || option == 2, "Vote option has to be either 1 or 2.");
        require(ballotOf_[msg.sender] == 0, "The sender has casted ballots."); // no re-vote
        ballotOf_[msg.sender] = option;
        voteCounts[option] = voteCounts[option] + 1; // TODO(xinbenlv): use SafeMath in a real implementation
        emit OnVote(msg.sender, option);
        return true;
    }

    function setStatus(bool /* isOpen */) public pure returns (bool success) {
        require(false); // always public status change in this implementation
        return false;
    }

    function ballotOf(address addr) public view returns (uint option) {
        return ballotOf_[addr];
    }

    function weightOf(address /* addr */) public pure returns (uint weight) {
        return 1;
    }

    function getStatus() public pure returns (bool isOpen) {
        return true; // always open
    }

    function weightedVoteCountsOf(uint option) public view returns (uint count) {
        return voteCounts[option];
    }

    function winningOption() public view returns (uint option) {
        if (voteCounts[1] >= voteCounts[2]) {
            return 1; // in a tie, 1 wins
        } else {
            return 2;
        }
    }

    function issueDescription() public pure returns (string memory desc) {
        return "Should we make John Smith our CEO?";
    }

    function availableOptions() public view returns (uint[] memory options_) {
        return options;
    }

    function optionDescription(uint option) public view returns (string memory desc) {
        return optionDescMap[option];
    }

    event OnVote(address indexed _from, uint _value);
    event OnStatusChange(bool newIsOpen);
}
