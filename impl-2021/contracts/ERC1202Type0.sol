// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./IERC1202.sol";

/**
 * @title Type 0 voting standard of ERC1202, a cluster of **Single-Input-Single-Output Issue**:
 * For every issue of this contract, it allows a vote with exactly 1 option from a voter.
 * The output is only and always a signle winning option.
 * 
 * NOTE: DO NOT USE IN PRODUCTION.
 *       This sample contract is for demonstration purpose. 
 *       It has been optimized for readability.
 *       A real production should conduct security audit and optimize for gas fees.
 *       DO NOT USE IN PRODUCTION.
 */ 
contract ERC1202Type0 is ERC1202Core {

    // The max option id (exclusive). For example, if OPTION_ID_UPPER_BOUND = 8, then Option can be {0, 1, 2..., 6, 7}
    uint constant OPTION_ID_UPPER_BOUND = 8;
        
    mapping(uint /*issueId*/ => mapping(address /*voterAddr*/ => mapping(uint /*optionId*/ => bool))) public voted;
    mapping(uint /*issueId*/ => mapping(address /*voterAddr*/ => uint /*optionId*/  )) public votes;
    mapping(uint /*issueId*/ => mapping(uint /*optionId*/  => uint /*voteCount*/ )) public results;
    
    function vote(uint _issueId, uint[] memory _optionIds) override external returns (bool)  {
        assert(_optionIds.length == 1);
        assert(_optionIds[0] < OPTION_ID_UPPER_BOUND);
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

}