pragma solidity ^0.5.8;

/**
 * Questions:
 *  - should the non-view functions return success or not?
 *
 *
 */


/**
 * ERC 1202 Primary Interface for a collection of voting.
 */
interface ERC1202 {

    // Vote with an option. The caller needs to handle success or not
    function vote(uint issueId, uint[] calldata option) external returns (bool success);
    function ballotOf(uint issueId, address addr) external view returns (uint[] memory option);
    function weightOf(uint issueId, address addr) external view returns (uint weight);
    function countOf(uint issueId, uint option) external view returns (uint count);
    function winnerOption(uint issueId) external view returns (uint option);
    function topOptions(uint issueId, uint limit) external view returns (uint[] memory topOptions_);

    // Q: does it need to also expose weight?
    event OnVoted(uint indexed issueId, address indexed from, uint[] option);
    event OnFinalized(uint issueId, uint winner);
}

/**
 * Interface for controlling the status of each voting issue.
 */
interface ERC1202StatusController {
    function open(uint issueId) external returns (bool success);
    function close(uint issueId) external returns (bool success);
    event OnOpened(uint issueId);
    event OnClosed(uint issueId);
}

/**
 * Optional Interface for exposing the metadata of
 */
interface ERC1202Metadata {
    function name() external view returns (string memory name_);
    function getIssueDescription(uint issueId) external view returns (string memory desc);
    function getAvailableOptions(uint issueId) external view returns (uint[] memory options);
    function getOptionDescription(uint issueId, uint option) external view returns (string memory desc);
}

/**
 * Optional Interface for commit-reveal voting.
 */
interface ERC1202CommitInterface {
    function commit(uint issueId, uint[] calldata option) external returns (bool success); // optional
    event OnCommitted(uint issueId, uint[] options);
}
