// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./IERC1202.sol";

/**
 * @title Type 0 voting standard of ERC1202, a cluster of **Single-Input-Single-Output Issue**:
 * For every issue of this contract, it allows a vote with exactly 1 option from a voter.
 * The output is only and always a signle winning option.
 * Rules:
 *  1. everyone has equal weights
 *  2. everyone can vote, no voter-qualitifications setup needed.
 *  3. every vote has 1 and only 1 option.
 *  4. options with most votes are the winner
 *  5. there is no limit of time
 *  6. when tied, the earlier index of options won
 * 
 * NOTE: DO NOT USE IN PRODUCTION.
 *       This sample contract is for demonstration purpose. 
 *       It has been optimized for readability.
 *       A real production should conduct security audit and optimize for gas fees.
 *       DO NOT USE IN PRODUCTION.
 */ 
contract ERC1202Type0 is ERC1202Core, ERC1202Metadata, ERC1202Status {

    // The max option id (exclusive). For example, if OPTION_ID_UPPER_BOUND = 8, then Option can be {0, 1, 2..., 6, 7}
    uint constant OPTION_ID_UPPER_BOUND = 8;
    uint constant MAX_ISSUE_ID = 256; // exclusive

    mapping(uint /*issueId*/ => mapping(address /*voterAddr*/ => mapping(uint /*optionId*/ => bool))) public voted;
    mapping(uint /*issueId*/ => mapping(address /*voterAddr*/ => uint /*optionId*/  )) public votes;
    mapping(uint /*issueId*/ => mapping(uint /*optionId*/  => uint /*voteCount*/ )) public results;
    
    function vote(uint _issueId, uint[] memory _optionIds) override external returns (bool)  {
        validateIssue(_issueId);
        validateOptions(_optionIds);
        uint newVotedOptionId = _optionIds[0];

        uint oldVotedOptionId = votes[_issueId][msg.sender];
        if (voted[_issueId][msg.sender][oldVotedOptionId]) {
            results[_issueId][oldVotedOptionId]--;
            voted[_issueId][msg.sender][oldVotedOptionId] = false;
        }

        results[_issueId][newVotedOptionId]++;
        voted[_issueId][msg.sender][newVotedOptionId] = true;
        votes[_issueId][msg.sender] = _optionIds[0];
        emit OnVote(_issueId, _optionIds, msg.sender);
        return true;
    }

    function topOptions(
        uint _issueId, uint /*_limit*/
        ) override external view returns (uint[] memory) {
        validateIssue(_issueId);
        uint mostVotedOption = 0;
        for (uint i=0; i<OPTION_ID_UPPER_BOUND; i++) {
            if (results[_issueId][i] > results[_issueId][mostVotedOption]) {
                mostVotedOption = i;
            }
        }
        uint[] memory result = new uint[](1);
        result[0] = mostVotedOption;
        return result;
    }

    // --------------- ERC1202Metadata ----------------
    function issueText() override external pure returns (string memory _text) {
        return "placeholder text";
    }

    function issueURI(uint256 _issueId) override external pure returns (string memory _uri) {
        validateIssue(_issueId);
        return "https://pixabay.com/get/gb31bb3a2975f74f66ddd03ae360b14a596ed2e960154939ef812e998d138564b3081e88645bc6c06494eec831213978205fba62fee1f76eccf3727810b7b593af4000c6968ec5e3113b3d9fb76f27cc3_640.jpg";
    }

    function optionText(uint _issueId, uint _optionId) override external pure returns (string memory _text) {
        validateIssue(_issueId);
        require(_optionId < OPTION_ID_UPPER_BOUND);
        return "Poll option";
    }
    
    function optionURI(uint _issueId, uint _optionId) override external pure returns (string memory _uri) {
        validateIssue(_issueId);
        require(_optionId < OPTION_ID_UPPER_BOUND);
        return "https://example-poll.com/poll_option";
    }

    // --------------- ERC1202Status ----------------
    function setStatus(uint /*_issueId*/, bool /*_isOpen*/) override external pure returns (bool /*_success*/) {
        require(false); // always not settable
    }
    
    function getStatus(uint /*_issueId*/) override external pure returns (bool _isOpen) {
        return true;
    }

    function voteOf(uint _issueId, address _voter) override external view returns (uint[] memory _optionIds) {
        validateIssue(_issueId);
        uint[] memory optionIds = new uint[](1);
        optionIds[0] = votes[_issueId][_voter];
        return optionIds;
    }

    // --------------- Private ----------------
    function validateIssue(uint _issueId) private pure returns (bool success) {
        require(_issueId < MAX_ISSUE_ID, "Issue I should be less 256");
    }

    function validateOptions(uint[] memory _optionIds) private pure returns (bool success) {
        require(_optionIds.length == 1, "When voting, only one option is allowed.");
        require(_optionIds[0] < OPTION_ID_UPPER_BOUND, "Option Id should all be smaller than OPTION_ID_UPPER_BOUND.");
    }
}