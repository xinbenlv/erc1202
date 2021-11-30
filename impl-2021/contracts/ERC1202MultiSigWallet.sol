pragma solidity >=0.7.0 <0.9.0;

import "./IERC1202.sol";

contract ERC1202MultiSigWallet is ERC1202Core, ERC1202Metadata, ERC1202Status {
    uint constant MAX_ISSUE_ID = 2;
    uint constant OPTION_ID_UPPER_BOUND = 2;
    uint constant MAX_OPTIONS_PER_BALLOT = 2;
    uint quorumSize;
    uint totalNumOfOwnerAddresses;
    address[] ownerAddresses;
    mapping(address => bool) addressToApprovalStatus;
    uint currentNumOfApprovals;
    string text;

    address targetContract;
    bytes executeData;

    constructor (uint _quorumSize, uint _total, address[] _ownerAddresses) {
        quorumSize = _quorumSize;
        total = _total;
        ownerAddresses = _ownerAddresses;
    }

    // --------------- ERC1202Core ----------------
    function vote(uint _issueId, uint[] memory _optionIds) override external returns (bool)  { 
        validateIssue();
        validateOptions();
        bool found = false;
        for (uint i = 0; i < totalNumOfOwnerAddresses; i++) {
            if (ownerAddresses[i] == msg.sender) {
                found = true; 
                break;
            }
        }
        require(found, "Approval should come from an owner address.");
        require(!addressToApprovalStatus[msg.sender], "This address should not have previously approved.");
        currentNumOfApprovals++;
        addressToApprovalStatus[msg.sender] = true;
    }

    function topOptions(
       uint _issueId, uint _limit
       ) 
        override
        external
        view
        returns (uint[] memory) {
        require (currentNumOfApprovals >= quorumSize);
        return [1]; // when approved, reuturn [1]
    }

    // --------------- ERC1202Metadata ----------------
    function availableOptions(uint256 issueId) override external pure returns (uint[] memory) {
        return [1]; // only option 1 is allowed
    }

    function issueText(uint256 _issueId) override external pure returns (string memory _text) {
        validateIssue();
        return text;
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
    function setStatus(uint _issueId, bool /*_isOpen*/) override external pure returns (bool /*_success*/) {
        require(false, "Not relevant");
    }
    
    function getStatus(uint /*_issueId*/) override external pure returns (bool _isOpen) {
        return true;
    }

    function voteOf(uint _issueId, address _voter) override external view returns (uint[] memory _optionIds) {
        validateIssue(_issueId);
        uint[] result = new uint[](1);
        result[0] = addressToApprovalStatus[msg.sender];
        return result;
    }

    // --------------- Extension ------------------------
    function isApproved() public view returns (bool isApproved) {
        if (currentNumOfApprovals >= quorumSize) return true;
        else return false;
    }

    function reset() public {
        currentNumOfApprovals = 0;
        for (uint i = 0; i < ownerAddresses.length; i++) {
            addressToApprovalStatus[ownerAddresses[i]] = false;
        }
        targetContract = 0x0;
        executeData = "";
    }

    function createProposal(address _targetContract, bytes _executeData, string text) {
        targetContract = _targetContract;
        executeData = _executeData;
    }

    function proxyExecute() public payable {
        if (isApproved()) {
            targetContract.call(executeData);
            reset();
        }
    }

    // --------------- Private Helpers ----------------
    function validateIssue(uint _issueId) private pure returns (bool success) {
        require(_issueId < MAX_ISSUE_ID, "Issue I should be less MAX_ISSUE_ID");
    }

    function validateOptions(uint[] memory _optionIds) private pure returns (bool success) {
        for (uint i = 0; i < _optionIds.length; i++) {
            require(_optionIds[i] < OPTION_ID_UPPER_BOUND, "Option Id should all be smaller than OPTION_ID_UPPER_BOUND.");
        }
    }

    function uintToString(uint v) constant returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory s = new bytes(i);
        for (uint j = 0; j < i; j++) {
            s[j] = reversed[i - 1 - j];
        }
        str = string(s);
    }

    function appendUintToString(string inStr, uint v) constant returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory inStrb = bytes(inStr);
        bytes memory s = new bytes(inStrb.length + i);
        uint j;
        for (j = 0; j < inStrb.length; j++) {
            s[j] = inStrb[j];
        }
        for (j = 0; j < i; j++) {
            s[j + inStrb.length] = reversed[i - 1 - j];
        }
        str = string(s);
    }
}