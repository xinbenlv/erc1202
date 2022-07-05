// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface IERC1202Core {
    event VoteCast(
        address indexed voter,
        uint256 proposalId,
        uint8 support,
        uint256 weight,
        string reason,
        bytes extraParams
    );

    function castVote(
        uint256 proposalId,
        uint8 support,
        uint256 weight,
        string calldata reasonUri,
        bytes calldata extraParams // TODO: under what circumstaince the params will be used?
    ) external returns (uint256 balance);

    function execute(uint256 proposalId, bytes memory extraParams)
        external
        returns (uint256 balance);

    function votingPeriodFor(uint256 proposalId) external view returns (uint256 startBlock, uint256 endBlock);
}

interface IERC1202XDelegate {
    function delegates(address account) external view returns (address);
    function delegate(address delegatee, bytes[] calldata extraParams) external;
}

interface IERC1202XProposal {
    event ProposalCreated(
        uint256 proposalId,
        string proposalUri,
        address proposer,
        address[] targets,
        uint256[] values,
        string[] signatures,
        bytes[] calldatas,
        uint256 startBlock,
        uint256 endBlock
    );
    event ProposalExecuted(uint256 proposalId);
    // TODO: add ProposalCanel/Edit/Withdraw Event and Functions?

    // TODO: decide whether we require generating ProposalId in the method or not?
    // TODO: if require generating ProposalId internally, can it be incremental hash-generated?
    // TODO: what if proposal need to demonstrate sufficient support? How to input quorum?
    function proposeProposal(
        uint256 proposalId,
        string memory proposalUri,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        uint256 startblock,
        uint256 endblock,
        bytes memory extraParams
    ) external returns (uint256 proposalregisteredProposalIdId);

    // TODO: what's most proper way to update the voting period?
    // TODO: do we want to include cancel or withdraw?
    // TODO: what's the best way to include weight scheme?
}
