pragma solidity ^0.5.8;

// We need the ability to return dynamic-sized array for top options
// pragma experimental ABIEncoderV2;


import "./ERC1202.sol";

// Requires all approval to approve a transaction
contract JointWallet is ERC1202 {

    struct PayRequest {
        bool isInit;
        address payTo;
        uint amount;
        string note;
        bool approval;
        bool finalized;
        uint approvalCount;
        bool paid;
        mapping (address => bool) voted;
    }

    mapping (uint => PayRequest) requests;
    mapping (address => bool) owners;
    uint ownerCount = 0;
    constructor () public {}
    function initialize(address[] memory owners_) public {
        for (uint i = 0; i < owners_.length; i++) {
            owners[owners_[i]] = true;
        }
        ownerCount = owners_.length;
    }

    function addPayRequest(uint issueId, address payTo, uint amount, string memory note) public {
        require (!requests[issueId].isInit, "request is not already initialized"); // ensure there is no requests with the same issueId
        requests[issueId] = PayRequest(true, payTo, amount, note, false, false, 0, false);
        emit OnPayRequestReceived(issueId);
    }

    function issueApprovedPayment(uint issueId) public payable {
//        require (requests[issueId].isInit);
//        require (requests[issueId].finalized);
//        require (requests[issueId].approval);
//        require (!requests[issueId].paid);
//        require (address(this).balance >= requests[issueId].amount);
//        requests[issueId].payTo.transfer(requests[issueId].amount);
//        requests[issueId].paid = true;
        emit OnPaid(issueId, requests[issueId].payTo, requests[issueId].amount);
    }

    // ERC1202 interface methods
    function vote(uint issueId, uint[] calldata option) external returns (bool success) {
//        require (owners[msg.sender] == true && !req.voted[msg.sender],
//            "Sender must be an owner of the joint wallet and haven't voted."); // sender needs to be an owner
//        PayRequest storage req = requests[issueId];
//        require (req.isInit && !req.finalized && !req.voted[msg.sender]); // pay request exists and haven't been finalized
//        require (option.length == 1 && (option[0] == 1 || option[0] == 0)); // only accept 1 = APPROVE and 0 = REJECT
//        req.voted[msg.sender] = true;
//        emit OnVoted(issueId, msg.sender, option);
//        if (option[0] == 0) {
//            req.finalized = true;
//            req.approval = false;
//            emit OnFinalized(issueId, 0); // any reject will cause the vote be finalized
//        }
//        else {
//            req.approvalCount++;
//            if (req.approvalCount == ownerCount) {
//                req.finalized = true;
//                req.approval = true;
//                emit OnFinalized(issueId, 1); // any reject will cause the vote be finalized
//            }
//        }
    }


    // ERC1202 interface methods
    function ballotOf(uint issueId, address addr) external view returns (uint[] memory option) {
        require (false, "We don't return ballot of approvers in this use case"); // we don't return who approved or not in this use case.
    }

    // ERC1202 interface methods
    function weightOf(uint issueId, address addr) external view returns (uint weight) {
        require (owners[msg.sender]);
        return 1;
    }

    // ERC1202 interface methods
    function countOf(uint issueId, uint option) external view returns (uint count) {
        require (false, "We don't return ballot of approvers in this use case"); // we don't return who approved or not in this use case.
    }

    // ERC1202 interface methods
    function topOptions(uint issueId, uint limit) external view returns (uint[] memory topOptions_) {
        require (false, "We don't return ballot of approvers in this use case"); // we don't return who approved or not in this use case.
    }

    // ERC1202 interface methods
    function winnerOption(uint issueId) external view returns (uint option) {
        return uint(0); // TODO
    }

    function () external payable {
        emit OnDeposited(address(this).balance, msg.sender, msg.value);
    }

    event OnPayRequestReceived(uint issueId);

    event OnPaid(uint indexed issueId, address indexed addr, uint amount);

    // ERC1202 interface methods
    event OnVoted(uint indexed issueId, address indexed from, uint[] option);

    // ERC1202 interface methods
    event OnFinalized(uint issueId, uint winner);

    event OnDeposited(uint newBalance, address indexed from, uint amount);

}
