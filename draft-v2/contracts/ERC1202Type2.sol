// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./IERC1202.sol";

/**
 * @title Type 2 voting standard of ERC1202 is a Ranked-Choice Voting.
 * 
 * NOTE: DO NOT USE IN PRODUCTION.
 *       This sample contract is for demonstration purpose. 
 *       It has been optimized for readability.
 *       A real production should conduct security audit and optimize for gas fees.
 *       DO NOT USE IN PRODUCTION.
 */ 
contract ERC1202Type2 is ERC1202Core, ERC1202Metadata, ERC1202Status {
    uint constant MAX_ISSUE_ID = 256;
    uint constant OPTION_ID_UPPER_BOUND = 32;
    uint constant MAX_OPTIONS_PER_BALLOT = 8;
    mapping(uint /*issueId*/ => mapping(address /*voterAddr*/ => bool)) public voted;
    mapping(uint /*issueId*/ => mapping(address /*voterAddr*/ => uint[] /*optionId*/  )) public votes;
    mapping(uint /*issueId*/ => mapping(uint /*optionId*/  => uint /*voteCount*/ )) public results;
    function vote(uint _issueId, uint[] memory _optionIds) override external returns (bool)  {
        require(_optionIds.length <= MAX_OPTIONS_PER_BALLOT, "Error: too many options!"); 

        for (uint i=0; i< _optionIds.length; i++) {
            require(_optionIds[i] < OPTION_ID_UPPER_BOUND, "Error: optionId out of bound");
        }
        uint[] memory oldVotedOptionIds = votes[_issueId][msg.sender];
        require(!voted[_issueId][msg.sender], "Error: no double vote allowed");
        voted[_issueId][msg.sender] = true;
        for (uint i=0; i<_optionIds.length; i++) {
            uint newVotedOptionId = _optionIds[i];
            results[_issueId][newVotedOptionId]++;
        }
        votes[_issueId][msg.sender] = _optionIds;
        emit OnVote(_issueId, _optionIds, msg.sender);
        return true;
    }

    function topOptions(
       uint _issueId, uint _limit
       ) 
        override
        external
        view
        returns (uint[] memory) {
        require(_limit > 0 && _limit < OPTION_ID_UPPER_BOUND, "Error: it requires 0 < limit OPTION_ID_UPPER_BOUND");
        uint[] memory result = new uint[](_limit);
        uint[] memory sortedOptionIds = sortKeyByValueDesc(results[_issueId], OPTION_ID_UPPER_BOUND);
        if (_limit - 1 < OPTION_ID_UPPER_BOUND) {
            require(results[_issueId][sortedOptionIds[_limit-1]] > results[_issueId][sortedOptionIds[_limit]], "Error: it's a tie");
        }

        for (uint i = 0; i < _limit; i++) {
          result[i] = sortedOptionIds[i];
        }
        return result;
    }

    // --------------- ERC1202Metadata ----------------
    function availableOptions(uint256 issueId) override external pure returns (uint[] memory) {
        uint[] memory result = new uint[](OPTION_ID_UPPER_BOUND);
        for (uint i = 1; i < OPTION_ID_UPPER_BOUND; i++) {
            result[i-1] = i;
        }
        return result;
    }

    function issueText(uint256 _issueId) override external pure returns (string memory _text) {
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
        return votes[_issueId][_voter];
    }

    // --------------- Private ----------------
    function validateIssue(uint _issueId) private pure returns (bool success) {
        require(_issueId < MAX_ISSUE_ID, "Issue I should be less MAX_ISSUE_ID");
    }

    function validateOptions(uint[] memory _optionIds) private pure returns (bool success) {
        for (uint i = 0; i < _optionIds.length; i++) {
            require(_optionIds[i] < OPTION_ID_UPPER_BOUND, "Option Id should all be smaller than OPTION_ID_UPPER_BOUND.");
        }
    }

    // Privete Helper
    function sortKeyByValueDesc(mapping(uint => uint) storage _keyValueMap, uint keyUpperBound) 
        private view returns (uint[] memory sortedKeys) {
        uint[] memory keysToSort = new uint[](keyUpperBound);
        for(uint i=0; i<keyUpperBound; i++) {
            keysToSort[i]= i;
        }
        for (uint a=1; a<keyUpperBound; a++) {
            for (uint b=0; b<a; b++) {
               uint keyA = keysToSort[a];
               uint keyB = keysToSort[b];
               uint valueA = _keyValueMap[keyA];
               uint valueB = _keyValueMap[keyB];
               if (valueA > valueB) {
                   // swap the position of optionIdB and optionIdA
                   uint temp = keyA;
                   keysToSort[a] = keyB;
                   keysToSort[b] = temp;
               }
            }
        }
        return keysToSort;
    }

}