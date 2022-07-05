# EIP 1202 Extended Research

## Summary of Discussions

## Functionalities

### Voting Primitives

#### Options of Proposal

- Yay/Nay, Yay/Nay/Abstain, Yay/Nay/Abstain/
- Multi-options: Equal / Ordered

#### Eligibility and Weights

- How is weight/eligibility calculated?
- How to lock weights/eligibility to avoid double voting?

#### Begin, End, Winning, Ties

- How to represent period of voting?
- How to declare winning of voting?

#### Proposals

- How to create a proposal?
- How to execute a proposal?
- How to lock a proposal?

- On-chain or Off-chain voting?
- Anonymity and privacy, counter-bribery?

### Early Feedback Questions (2018-07-08)

Here are a few early questions I'd like to ask people here.

1. Have we had any duplicated EIPs that I overlooked. If not, have anyone attempted to do so, and why it did not continue to exist?
   **Answer**: We concluded there is no duplicated efforts working on creating a voting standard.

2. Should each issue have its own smart contract address (like individual item on [EIP-721](https://eips.ethereum.org/EIPS/eip-721)) or should it support multiple items in [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155), or should it support multi-class voting in [EIP-1178](https://eips.ethereum.org/EIPS/eip-1178), [EIP-1203](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1203.md) (e.g. certain issue can override another issue)
   **Answer**: We will provide examples of both and seek comments.

3. Should the voting support proxy(e.g [EIP-897](https://eips.ethereum.org/EIPS/eip-897), [EIP-1167](https://eips.ethereum.org/EIPS/eip-1167)) and migration? What are potential security concerns
   **Answer**: It shall not be determined by this ERC.

4. Should it be proposed in a single phase standard or multiple separate into multiple phase, with earlier phase supporting easiest and simplest interface, and later phase supporting more advanced interfaces? (I intuitively believe it will be the latter, but not sure if it might be possible to do it all-at once.)
   **Answer**: It will unavoidably require upgrade in the future, but supporting multiple issue multiple options will be good enough so far.

5. Should it support or optionally support [EIP-165](https://eips.ethereum.org/EIPS/eip-165)? For public voting, support EIP-165 make it easier to discover, but for secret voting people might not want to disclose a voting for certain issue even exist.
   **Answer**: It shall not be determined by this ERC.

### Second Feedback Questions 2018-07-19

1. Is it technically possible to achieve anonymous voting on current Ethereum/EVM setup, is it possible that people either hide their identity, or hide what selection they made in a vote given that for a smart contract the public states are visible from block history directly, and internal private state can be replied in any fullnode?

2. number byte length: for simplicity we are using `uint` anywhere undecided. We need to decided what number byte length should we use for `weights` and `options`.

## Extended Bibliography

### Worthnoting Academic Papers

### Related Articles

- [Token-weighted voting implementation](https://blog.colony.io/token-weighted-voting-implementation-part-1-72f836b5423b)

## Interactions with other ERCs

// TODO add interaction discussion for the following ERCs
ERC20, ERC721, ERC735, ERC780, ERC165

## Security and Privacy of Voting

We will discuss the security and privacy of voting in this separate section. The key is to choose a simple-enough solutions that helps the major voting cases.

It's important to note that certain Security & Privacy model assumptions are incompatible with each other. For example, on one hand we may want to make sure that one can verify the vote they casted are counted as what they choose, on the other hand, the fact this is verifiable make it possible to accept bribary based on how they vote.

// TODO: this part is unfinished

Here are a few prelimiary literature research result.

- [Protocols for Secure Computations(extended abstract), by Andrew C. Yao, 1982](https://research.cs.wisc.edu/areas/sec/yao1982-ocr.pdf)
- [https://www.cypherpunks.ca/~iang/pubs/sqlpir-pets.pdf](https://www.cypherpunks.ca/~iang/pubs/sqlpir-pets.pdf)
- [A practical secret voting scheme for large scale elections, by Atsushi Fujioka et al, 1992](https://dl.acm.org/citation.cfm?id=713943)
- [SHARVOT: secret SHARe-based VOTing on the blockchain, by Silvia Bartolucci et al, Mar 2018](https://arxiv.org/pdf/1803.04861.pdf)
- [A Smart Contract for Boardroom Voting with Maximum Voter Privacy] (https://eprint.iacr.org/2017/110.pdf)

## Comprehensive Application Examples

- Example 1: MutliSig Case: Joint Wallet Account Spending Approval
- Example 2: PLCR Case: Secret Vote
- Example 3: Custom Follow-up Action Case: Token Re-issue

## Case Study

### Existing Voting Systems in Blockchain World of ERCs ERC20, ERC721, ERC735, ERC780, ERC165

// TODO

#### Carbon Vote

// TODO

#### PLACE Voting

https://medium.com/@jameson.quinn/how-place-voting-works-617a5e8ac422

#### PLCR Voting

[PLCR Voting: ](https://github.com/ConsenSys/PLCRVoting)
https://medium.com/metax-publication/a-walkthrough-of-plcr-voting-in-solidity-92420bd5b87c


### Exiting Voting Systems in Real World
- Simple Majority Vote Requiring Quorum (e.g. Company Board)
- Two-tiered Shareholder Vote (e.g. GOOG, FB)
- Jury Decision of US Federal Criminal Court (All Ayle for Guity, 5/5 for Tie)
- US Presidential Election: Different Vote Time, Multi-Reginal, Two-level (General and Editorial(delegate))
- Super-Girl China 2005: Idol Ranking Vote, Multiple Votes Allowed

## Request for Comment

We kindly request the community for comments, in particular, the following ERC and projects related authors:

- ERC-20: @frozeman, @vbuterin
- ERC-721: @fulldecent, Dieter Shirley, Jacob Evans, Nastassia Sachs
- Carbon Vote: @lgn21st, @Aaaaaashu
- Alex Van de Sande (Mist) and Nick Johnson (ENS) _ - suggested by Fabian (@frozeman)_
- Will Warren, 0xProject a project who cares a lot about governance. _ - nominated by Evan(@evanbots)_

Your comments and suggestions will be greatly appreciated.
