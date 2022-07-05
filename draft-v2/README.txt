A project for ERC1202 and sample code.

This directory conforms to a REMIX IDE
project.

A few design question for each voting event:

1. Should there be a timelimit for voting to close? 
- If we choose to impose a time limit, we will only declare a winning option or a set of winning options after the time limit.
- If we don't impose a limit, we will allow declaring a winning option at all time.

2. Should we allow revote/change of vote?
- For simplicity, we disallow change of vote.

3. How to deal with "tie" result?
- For simplicity, we will output an error with "tie"
