# EIP 1202 Additional Sections

This file contains the sections originally contained in the draft of ERC-1202.

## Simple Code Examples

### Example 1: Simplest Version: Single Issue Yes/No Question Per Smart Contract Address Per Non-Weighted Vote

- [Source Code](https://github.com/xinbenlv/eip-1202-draft/blob/master/contracts/simple-version/SimplestVote1202.sol)

- [Deployment (Ropsten)](https://ropsten.etherscan.io/address/0x067e76ddd9c67f7ae606b18d881545512d4b680c#code)

### Example 2: TokenVote with Simple Interface with Weight Assigned by Token and Pre-registered Snapshot of Token-Holders4

- [Source Code](https://github.com/xinbenlv/eip-1202-draft/blob/master/contracts/simple-version/TokenVote1202.sol)
- [Deployment (Ropsten)](https://ropsten.etherscan.io/address/0x5bd007a224fe8820b19cc0bce8e241f4752ce74d#code)

### Example 3: TokenVote with Advanced Interface

- [Source Code](https://github.com/xinbenlv/eip-1202-draft/blob/master/contracts/advanced-version/AdvancedTokenVote1202.sol)
- [Deployment (Ropsten)](https://ropsten.etherscan.io/address/0xfd8b3be5f9db4662d1c9269f948345b46e37fd26#code)

## Bibliography

### Related EIPs

- [EIP-20: ERC-20 Token Standard (a.k.a. ERC-20)](./eip-20.md)
- [EIP-165: Standard Interface Detection](./eip-165.md)
- [EIP-721: Non-Fungible Token Standard(a.k.a. ERC-721)](./eip-721.md)
- [EIP-735: ERC: Claim Holder](https://github.com/ethereum/EIPs/issues/735)
- [EIP-780: ERC: Ethereum Claims Registry](https://github.com/ethereum/EIPs/issues/780)
- [EIP-777: A New Advanced Token Standard](./eip-777.md)
- [EIP-897: ERC DelegateProxy](./eip-897.md)
- [EIP-1155: Crypto Item Standard](./eip-1155.md)
- [EIP-1178: Multi-class Token Standard](./eip-1178.md)
- [EIP-1167: Minimal Proxy Contract](./eip-1167.md)
- [EIP-1203: Multi-class Token Standard(ERC-20 Extension)](./eip-1203.md)
- [EIP-1417: Poll Standard](https://eips.ethereum.org/EIPS/eip-1417)
- [ERC-3000: Optimistic enactment governance standard](https://eips.ethereum.org/EIPS/eip-3000)

### Worthnoting Projects

#### General Use-case

- [OpenZeppelin Governor](https://blog.openzeppelin.com/governor-smart-contract/)'s [IGovernor](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.7.0/contracts/governance/IGovernor.sol)
- [Aragon Voting App](https://github.com/aragon/aragon-apps): [solidity](https://github.com/aragon/aragon-apps/blob/master/apps/voting/contracts/Voting.sol), [wiki](https://wiki.aragon.org/dev/apps/voting/)
- https://github.com/snapshot-labs/snapshot

#### General Frontend
- https://www.tally.xyz/
- https://sybil.org/#/delegates/ens

#### Active Blockchain Projects under Governance
#####  MakerDAO's governance

- [dapp](https://vote.makerdao.com/)
- [doc](https://docs.makerdao.com/smart-contract-modules/governance-module)
- Code: [DS-Chief](https://github.com/dapphub/ds-chief), [DS-Pause](https://github.com/dapphub/ds-pause), [DS-Spell](https://github.com/dapphub/ds-spell).
- [demo video](https://vimeo.com/649207489)
- Polling Vote, MIP Vote, Executive Vote

##### COMPOUND's governance

- [dapp](https://compound.finance/governance)
- [smart contract](https://etherscan.io/address/0xc0da02939e1441f497fd74f78ce7decb17b66529#code)

##### Uniswap Governance

- [Community Governance Process](https://gov.uniswap.org/t/community-governance-process/7732)
- [dapp](https://snapshot.org/#/uniswap)

#### Other projects

- [Ethereum DAO: How to build a DEMOCRACY on the blockchain](https://www.ethereum.org/dao)
- [Carbon Vote](http://carbonvote.com/)
- [Paper: A Smart Contract for Boardroom Voting with Maximum Voter Privacy](https://eprint.iacr.org/2017/110.pdf) - *Suggested by @aodhgan*
- [Private Voting for TCR](https://blog.enigma.co/private-voting-for-tcrs-with-enigma-b441b5d4fa7b)
- [Bribe Protocols](https://www.bribe.xyz/)
- https://github.com/mohamedsgap/voting-dapp/blob/master/contracts/Election.sol
- https://blog.tally.xyz/understanding-governor-bravo-69b06f1875da
- https://wiki.tally.xyz/docs/other-protocols
- https://blog.tally.xyz/the-case-for-governor-alpha-15c1362d49eb
- https://www.comp.xyz/t/governor-bravo-development/942/9
- Fractional Vote: https://github.com/Arr00-Blurr/compound-protocol/pull/2

### Worthnoting Articles

- https://medium.com/practical-blockchain/getting-more-insights-from-the-ethereum-carbonvote-9e4d2eb46e8
- https://www.geeksforgeeks.org/what-is-decentralized-voting-application-dapps/
- https://blog.aragon.org/a-taxonomy-of-voting-methods/
- [Aragon Nest Proposal: Secret voting infrastructure using Ring/Threshold signatures](https://github.com/aragon/nest/issues/12)
- https://github.com/stonecoldpat/anonymousvoting

## Acknowledgement

We appreciate Ansley, Andrew, Fred from Enigma, Fan and Raullen from IoTex for sharing us their use cases. we also appreciate the valuable input for designing an EIP from distinguished community members including: @frozeman, @fulldecent, @bingen, @aodhgan.
