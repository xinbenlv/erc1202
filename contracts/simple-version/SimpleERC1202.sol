pragma solidity ^0.4.22;


/**
 * - Single issue
 * - Single selection
 *
 * Discussion:
 *   1. Each address has a weight determined by other input decided by the actual implementation
 *      which is suggested to be set upon the initialization
 *   2. Is there certain naming convention to follow?
 */
interface ERC1202 {

    // Vote with an option. The caller needs to handle success or not
    function vote(uint option) external returns (bool success);
    function setStatus(bool isOpen) external returns (bool success);

    function issueDescription() external view returns (string desc);
    function availableOptions() external view returns (uint[] options);
    function optionDescription(uint option) external view returns (string desc);
    function ballotOf(address addr) external view returns (uint option);
    function weightOf(address addr) external view returns (uint weight);
    function getStatus() external view returns (bool isOpen);
    function weightedVoteCountsOf(uint option) external view returns (uint count);
    function winningOption() external view returns (uint option);

    event OnVote(address indexed _from, uint _value);
    event OnStatusChange(bool newIsOpen);
}