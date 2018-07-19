pragma solidity ^0.4.22;


/**
 * - Multiple issue
 * - Multiple selection
 * - Ordered multiple result
 * Discussion:
 *   1. Each address has a weight determined by other input decided by the actual implementation
 *      which is suggested to be set upon the initialization
 *   2. Is there certain naming convention to follow?
 */
contract AdvancedERC1202 {

    // Vote with an option. The caller needs to handle success or not
    function vote(uint issueId, uint option) public returns (bool success);
    function setStatus(uint issueId, bool isOpen) public returns (bool success);

    function issueDescription(uint issueId) public view returns (string desc);
    function availableOptions(uint issueId) public view returns (uint[] options);
    function optionDescription(uint issueId, uint option) public view returns (string desc);
    function ballotOf(uint issueId, address addr) public view returns (uint option);
    function weightOf(uint issueId, address addr) public view returns (uint weight);
    function getStatus(uint issueId) public view returns (bool isOpen);
    function weightedVoteCountsOf(uint issueId, uint option) public view returns (uint count);
    function topOptions(uint issueId, uint limit) public view returns (uint[] topOptions_);

    event OnVote(uint issueId, address indexed _from, uint _value);
    event OnStatusChange(uint issueId, bool newIsOpen);
}