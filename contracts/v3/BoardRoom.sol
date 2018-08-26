pragma solidity ^0.4.24;
//
//import "./ERC1202.sol";
//
//// UNFINISHED!!!
//// UNFINISHEDUNFINISHED!!!
//
//contract BoardRoom is ERC1202 {
//    enum Result { TIE, APPROVE, REJECT  }
//    mapping (address => bool) public boardMembers;
//    mapping (uint => mapping (address => Result)) records;
//
//    uint numApprovals;
//    uint numRejections;
//
//    uint boardMembers;
//
//    function addBoardMember(address member) public {
//
//    }
//
//    // ERC1202 interface methods
//    function vote(uint issueId, uint[] option) external returns (bool success) {
//        require (option.length == 1);
//        require (option[0] == Result.APPROVE || option[0] == Result.REJECT); // only accept 1 and 2 as APPROVE or REJECT
//        records[issueId][msg.sender] = ApprovalResult(option[0]);
//        if (option[0] == Result.APPROVE) numApprovals ++;
//        else numRejections ++;
//        OnVoted(0, [option[0]]);
//        if (numApprovals == Joint);
//    }
//
//    // ERC1202 interface methods
//    function ballotOf(uint issueId, address addr) external view returns (uint[] option) {
//        return [uint(records[issueId][addr])];
//    }
//
//    // ERC1202 interface methods
//    function weightOf(uint issueId, address addr) external view returns (uint weight) {
//        require (jointOwners[addr]);
//        return 1;
//    }
//
//    // ERC1202 interface methods
//    function countOf(uint issueId, uint option) external view returns (uint count) {
//        require (option == Result.APPROVE || option == Result.REJECT); // only accept 1 and 2 as APPROVE or REJECT
//        if (option == Result.APPROVE) return numApprovals;
//        else return numRejections;
//    }
//
//    // ERC1202 interface methods
//    function topOptions(uint issueId, uint limit) external view returns (uint[] topOptions) {
//        if (numApprovals > numRejections) return [Result.APPROVE];
//        else if (numRejections > numApprovals) return [Result.REJECT];
//        else return Result.TIE;
//    }
//
//    // ERC1202 interface methods
//    event OnVoted(uint indexed issueId, address indexed from, uint[] option);
//
//    // ERC1202 interface methods
//    event OnFinalized(uint issueId, uint[] topOptions);
//
//}