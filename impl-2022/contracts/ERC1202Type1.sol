// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./IERC1202.sol";

/**
 * @title Type 1 voting standard of ERC1202, a cluster of **Multiple-Input-Multiple-Output Issue**:
 * For every issue of this contract, it allows a vote with exactly 1 option from a voter.
 * The output is only and always a signle winning option.
 * 
 * NOTE: DO NOT USE IN PRODUCTION.
 *       This sample contract is for demonstration purpose. 
 *       It has been optimized for readability.
 *       A real production should conduct security audit and optimize for gas fees.
 *       DO NOT USE IN PRODUCTION.
 */ 
contract ERC1202Type1 is ERC1202Core {
    uint constant OPTION_ID_UPPER_BOUND = 8;
    uint constant MAX_OPTIONS_PER_BALLOT = 8;
        
    mapping(uint /*issueId*/ => mapping(address /*voterAddr*/ => uint[] /*optionId*/  )) public votes;
    mapping(uint /*issueId*/ => mapping(uint /*optionId*/  => uint /*voteCount*/ )) public results;
    
    function vote(uint _issueId, uint[] memory _optionIds) override external returns (bool)  {
        assert(_optionIds.length <= MAX_OPTIONS_PER_BALLOT); 

        for (uint i=0; i< _optionIds.length; i++) {
            assert(_optionIds[i] < OPTION_ID_UPPER_BOUND);
        }

        uint[] memory oldVotedOptionIds = votes[_issueId][msg.sender];
        for (uint i=0; i<oldVotedOptionIds.length; i++) {
            uint oldVotedOptionId = oldVotedOptionIds[i];
            results[_issueId][oldVotedOptionId]--;
        }
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
       ) override external view returns (uint[] memory) {
       assert(_limit < OPTION_ID_UPPER_BOUND);
       uint realLimit = _limit > 0 ? _limit : OPTION_ID_UPPER_BOUND;
       uint[] memory result = new uint[](realLimit);
       uint[] memory sortedOptionIds = sortKeyByValue(results[_issueId], OPTION_ID_UPPER_BOUND);
       for (uint i=0;i<realLimit;i++) {
           result[i] = sortedOptionIds[i];
       }
       return sortedOptionIds;
    }
    
    function sortKeyByValue(mapping(uint => uint) storage _keyValueMap, uint keyUpperBound) 
        private view returns (uint[] memory sortedKeys) {
        
        uint[] memory keysToSort = new uint[](keyUpperBound);
        
        for(uint i=0; i<keyUpperBound; i++) {
            keysToSort[i]= i;
        }
        
        for (uint a=0; a<keyUpperBound; a++) {
            for (uint b=1; b<a; b++) {
               uint keyA = keysToSort[a];
               uint keyB = keysToSort[b];
               uint valueA = _keyValueMap[keyA];
               uint valueB = _keyValueMap[keyA];
               if (valueA < valueB) {
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