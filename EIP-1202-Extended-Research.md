# EIP 1202 Extended Research

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

### Example 1: MutliSig Case: Joint Wallet Account Spending Approval
// TODO

### Example 2: PLCR Case: Secret Vote
// TODO

### Example 3: Custom Follow-up Action Case:  Token Re-issue
// TODO


## Case Study

### Existing Voting Systems in Blockchain WorldERCs ERC20, ERC721, ERC735, ERC780, ERC165
// TODO

#### Carbon Vote
// TODO

#### PLACE Voting
https://medium.com/@jameson.quinn/how-place-voting-works-617a5e8ac422

#### PLCR Voting
[PLCR Voting: ](https://github.com/ConsenSys/PLCRVoting)
https://medium.com/metax-publication/a-walkthrough-of-plcr-voting-in-solidity-92420bd5b87c

#### 

### Exiting Voting Systems in Real World
// TODO

#### Simple Majority Vote Requiring Quorum (e.g. Company Board)
// TODO, and a small variant: ZaiGeZaiGu function committee approval (1/2 as quorum, majority vote)


#### Two-tiered Shareholder Vote (e.g. GOOG, FB)
// TODO

#### Jury Decision of US Federal Criminal Court (All Ayle for Guity, 5/5 for Tie)
// TODO

#### US Presidential Election: Different Vote Time, Multi-Reginal, Two-level (General and Editorial(delegate))    
// TODO

#### Super-Girl China 2005: Idol Ranking Vote, Multiple Votes Allowed
// TODO

## Request for Comment
We kindly request the community for comments, in particular, the following ERC and projects related authors:

 - ERC-20: @frozeman, @vbuterin
 - ERC-721: @fulldecent, Dieter Shirley, Jacob Evans, Nastassia Sachs
 - Carbon Vote: @lgn21st, @Aaaaaashu
 - Alex Van de Sande (Mist) and Nick Johnson (ENS) * - suggested by Fabian (@frozeman)*
 - Will Warren, 0xProject a project who cares a lot about governance. * - nominated by Evan(@evanbots)*

Your comments and suggestions will be greatly appreciated.
