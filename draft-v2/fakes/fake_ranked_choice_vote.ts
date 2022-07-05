class Voter {
    public index:number;
    constructor(i) {
        this.index = i;
    }
    public toString():string {
        return `Voter ${this.index}`;
    }
}
class Candidate {
    public index:number;
    constructor(i) {
        this.index = i;
    }
    public name():string {
        return String.fromCharCode("A".charCodeAt(0) + this.index - 1);;
    }
    public toString():string {
        return `Candidate ${this.name()}`;
    }
}
class Ballot {
    public voter:Voter;
    public candidates:Candidate[];
    constructor(voter:Voter, candidates:Candidate[]) {
        this.voter = voter;
        this.candidates = candidates;
        console.assert(candidates);
        let _set = new Set(this.candidates.map(c=>c.index));
        console.assert(_set.size == this.candidates.length); // DEV ASSERT no candidate were voted twice
    }
    public static createFromArray(voterIndex:number, candidateIndices:number[]) {
        let voter:Voter = new Voter(voterIndex);
        let candidateList:Candidate[] = candidateIndices.map(cIndex => new Candidate(cIndex));
        console.assert(candidateIndices);
        return new Ballot(voter, candidateList);
    }
    public static createFromArrayOfArray(arrayOfArray:number[][]):Ballot[] {
        let ballots:Ballot[] = [];
        for (let voterIndex = 0; voterIndex < arrayOfArray.length; voterIndex++) {
            let ballot = Ballot.createFromArray(voterIndex, arrayOfArray[voterIndex]);
            ballots.push(ballot);
        }
        return ballots;
    }
    public toString():string {
        return `The ${this.voter} voted ${this.candidates}`;
    }
}

class Election {
    public ballots:Ballot[];
    public ballotByVoter(voter:Voter) {
        return this.ballots[voter.index];
    }
    constructor(arrayOfArray:number[][]) {
        this.ballots = Ballot.createFromArrayOfArray(arrayOfArray);
        let _set = new Set(this.ballots.map(b=>b.voter.index));
        console.assert(_set.size == this.ballots.length); // DEV ASSERT no voters are double counted.
    }

    private voteCountsByCandidateIndex():Map<number, number> {
        let _voteCountsByCandidateIndex:Map<number, number> = new Map();
        for (let ballot of this.ballots) {
            let firstCandidate:Candidate = ballot.candidates[0];
            if (!_voteCountsByCandidateIndex.has(firstCandidate.index)) _voteCountsByCandidateIndex.set(firstCandidate.index, 0);
            _voteCountsByCandidateIndex.set(firstCandidate.index, _voteCountsByCandidateIndex.get(firstCandidate.index) + 1);
        }
        return _voteCountsByCandidateIndex;
    }

    public voteCountByCandidate(candidate:Candidate):number {
        return this.voteCountsByCandidateIndex().get(candidate.index);
    }

    public getVotersByCandidate(candidate:Candidate):Voter[] {
        let _votersByCandidateIndex:Map<number, Voter[]> = new Map();
        for (let ballot of this.ballots) {
            let firstCandidate:Candidate = ballot.candidates[0];
            if (!_votersByCandidateIndex.has(firstCandidate.index)) _votersByCandidateIndex.set(firstCandidate.index, []);
            _votersByCandidateIndex.get(firstCandidate.index).push(ballot.voter);
        }
        return _votersByCandidateIndex.get(candidate.index);
    }

    public sortedCandidates(): Candidate[] {
        let _voteCountsByCandidateIndex:Map<number, number> =  this.voteCountsByCandidateIndex();
        return Array.from(_voteCountsByCandidateIndex.keys())
            .sort((candidateIndexA:number, candidateIndexB:number)=> _voteCountsByCandidateIndex.get(candidateIndexB) - _voteCountsByCandidateIndex.get(candidateIndexA))
            .map(i => new Candidate(i));
    }

    public eleminateLeastFavoriteCandidate = function():Candidate {
        let _sortedCandidates:Candidate[] = this.sortedCandidates();
        console.assert(_sortedCandidates, `Error! The _sortedCandidates should not be null or undefined or zero length, but is ${_sortedCandidates}.`);
        console.log(`Current sortedCandidates by Votes:`);
        console.log(this.outcomeToString());
        let eliminatedCandidate:Candidate = _sortedCandidates[_sortedCandidates.length - 1];
        console.log(`The eliminatedCandidate is `, eliminatedCandidate);
        console.assert(eliminatedCandidate, `Error! The eliminatedCandidate should not be null or undefined.`);
        let unluckyVoters:Voter[] = this.getVotersByCandidate(eliminatedCandidate);
        console.log(`The voterByCandidate is `, unluckyVoters);
        for (let voter of unluckyVoters) {
            let ballot:Ballot = this.ballotByVoter(voter);
            console.log(ballot);
            ballot.candidates.splice(0, 1); // slice first preference
            if (ballot.candidates.length == 0) {
                continue;
            } else {
                let nextCandidateOnTheBallot:Candidate = ballot.candidates[0];

            }
        }
        return eliminatedCandidate;
    }
    public precentByCandidate(candidate:Candidate) {
        return 100.0 * this.voteCountByCandidate(candidate)/this.ballots.length;
    }

    public hasOutcome():boolean {
        let _leadingCandidate = this.sortedCandidates()[0];
        let _LeadingCount = this.voteCountByCandidate(_leadingCandidate);
        return (_LeadingCount > 0.5 * this.ballots.length)
    }
    public outcomeToString():string {
        let _sortedCandidates = this.sortedCandidates();
        return _sortedCandidates
            .map((c:Candidate) =>`${c} got ${this.voteCountByCandidate(c)} votes ~= ${this.precentByCandidate(c).toFixed(2)}%`)
            .reduce((a,b) => a+'\n'+b);
    }

    public toString():string {
        return `Election with all: ballots:\n${this.ballots.join('\n')}`;
    }
}

let main = async () => {
    console.log(`Hello!`);

    let RAW_BALLOTS = [
        [3, 4, 1, 3],
        [3, 4, 1, 3],
        [3, 4, 1, 3],
        [2, 4, 1, 3],
        [1, 2, 4, 3],
        [2, 4, 1, 3],
        [4, 1, 2],
        [2, 4, 3],
        [2, 4, 3],
        [4, 1, 2],
        [2, 4, 3],
        [1, 4, 2, 3],
        [1, 4, 2, 3],
        [4, 1, 2],
        [4, 1, 2],
    ];
    let election:Election = new Election(RAW_BALLOTS);

    let round = 0;
    while (!election.hasOutcome()) {
        console.log(`------------- Round ${round} ------------`)
        console.log(`Current ballots: ${election}`);
        let eleminatedCandidate = election.eleminateLeastFavoriteCandidate();
        console.log(`Elemented candidate ${eleminatedCandidate}`);
        console.log(`Outcome`);
        console.log(election.outcomeToString());
        round ++;
    }
    console.log(`------------- Final Result ------------`);
}



main().then(() =>{
    console.log(`Done!`);
});

