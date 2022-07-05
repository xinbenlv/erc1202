## Meeting Notes

### 2018-07-26
```
Participants: 
ERC1202: Zainan Victor Zhou (@xinbenlv)
Enigma: Ansley, Andrew, Fred 

SGX compatible with Ethereum
Commit and Reveal - 

Fred introduces Enigma’s roadmap

1st Release: Currently it works like a Computational Unit for Ethereum. Function as an Oracle.
2nd Release Secret Contract, with Enigma’s own implementation
3nd Release: having a Enigma’s own public chain

Victor discusses efforts so far
Victor looking into standards for voting so that there can be trust and reliability in votes across use cases. However there are many different implementations, which is a challenge.

May look into separate standards and extensions.

Andrew introduces his work
Andrew uses a counter, other polls use hashes of metadata inside the poll
Steps:
1. Create a poll, description (currently no time feature exists. A real implementation may want a timed poll). 
2. Anyone can cast a vote (no sybil protection, creator can vote. For a demo implementation, perhaps leave as general as possible).
  * This is up to the interface implementation developer to decide for their use case whether it makes to set certain limit for who can create the issue ( by stake, by role, by time, etc)  - @xinbenlv

We also discussed protecting privacy in reward-based voting.
Yin(coauthor) is looking into blockchain based solutions for conflict resolution or arbitration

Ideas to navigate this: generate encrypted pool of person, give the tokens back. (we have been thinking about using a coin-mixing primitive for this)
* Multiple rounds of votes
* Key challenge: how to decide who decides where add security. 
  * One argument is that a standard should support voting security, (with different categories, CR or multiple stage voting or other options made by implementer)
  * Other assumption is security/privacy is taken care of in another layer
How Enigma can be helpful
* Andrew to demonstrate how the secret contract/ oracle works-- post/release demo and post a link to the ERC discussion, highlight the interaction of a voting smart contract with a secured oracle. 
  * Has assumptions: someone needs to be able to query an encrypted vote
  * Smart contract receives tally thru interaction with oracle
```