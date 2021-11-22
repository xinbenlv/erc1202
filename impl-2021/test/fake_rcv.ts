
let eliminateCandidates = function (ballots) {
    let voteCountsByCandidate = {}, voterByCandidate = {};
    printBallots(ballots);

    for (let voter in ballots) {
        let ballot = ballots[voter];
        let candidateIndex = ballot[0];
        if (!voteCountsByCandidate[candidateIndex]) voteCountsByCandidate[candidateIndex] = 0;
        if (!voterByCandidate[candidateIndex]) voterByCandidate[candidateIndex] = [];
        voteCountsByCandidate[candidateIndex]++;
        voterByCandidate[candidateIndex].push(voter);
    }

    // check if one wins
    let sortedCandidates = Object.keys(voteCountsByCandidate)
        .sort((candidateA, candidateB)=> voteCountsByCandidate[candidateB] - voteCountsByCandidate[candidateA]);
    sortedCandidates.forEach(cIndex => console.log(`Candidate ${getCandidateName(parseInt(cIndex))}, received votes: ${voteCountsByCandidate[cIndex]}`));
    let eliminatedCandidateIndex = sortedCandidates[sortedCandidates.length - 1];
    console.log(`Eliminating Candidate: ${getCandidateName(parseInt(eliminatedCandidateIndex))}, whose votes are from Voter ${voterByCandidate[eliminatedCandidateIndex]}`);
    for (let voter of voterByCandidate[eliminatedCandidateIndex]) {
        let ballot = ballots[voter];
        console.log(`Voter ${voter}'s previous preference is eliminated, they voted ${ballotToString(ballots[voter])}`);
        ballot.splice(0, 1); // slice first preference
        if (ballot.length == 0) {
            continue;
        } else {
            let nextCandidateOnTheBallot = ballot[0];
            console.log(`The next on the voter ${voter}'s ballot is candidate ${getCandidateName(nextCandidateOnTheBallot)}`);
            if(!voteCountsByCandidate[nextCandidateOnTheBallot]) voteCountsByCandidate[nextCandidateOnTheBallot] = 0;
            voteCountsByCandidate[nextCandidateOnTheBallot] ++;
        }
    }
    delete voteCountsByCandidate[eliminatedCandidateIndex]; // eliminated
    // Before starting next round
    sortedCandidates = Object.keys(voteCountsByCandidate)
        .sort((candidateA, candidateB)=> voteCountsByCandidate[candidateB] - voteCountsByCandidate[candidateA]);
    console.log(`Candidate ranked by vote at round ${0}:`);
    sortedCandidates.forEach(cIndex => console.log(`Candidate ${getCandidateName(parseInt(cIndex))}, received votes: ${voteCountsByCandidate[cIndex]}`));
    console.log(`current ballots:`); // Print
    printBallots(ballots);
    return {
        newBallots: JSON.parse(JSON.stringify(ballots)), 
        sortedCandidates,
        voteCountsByCandidate,
    };
}

let printBallots = function (ballots) {
    for (let voter in ballots) {
        let ballot = ballots[voter];
        let candidateIndex = ballot[0];
        console.log(`Voter ${voter} casted a Ballot w/ Raw Data:${ballot}, neaming ${ballotToString(ballot)}`);
    }
}
let ballotToString = function (ballot) {
    return ballot.map(cIndex => getCandidateName(parseInt(cIndex)));
}

let getCandidateName = (candidateIndex:number) => {
    return String.fromCharCode("A".charCodeAt(0) + candidateIndex - 1);;
}

export let topOptions = function() {
    let _preferences = {};
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
    let ballots = JSON.parse(JSON.stringify(RAW_BALLOTS)); // create a deep copy
    let round = 0;
    while (true) {
        console.log(`------------- Round ${round} ------------`)
        let {newBallots, sortedCandidates, voteCountsByCandidate} = eliminateCandidates(ballots);
        ballots = JSON.parse(JSON.stringify(newBallots));
        if (voteCountsByCandidate[sortedCandidates[0]] > 0.5 * RAW_BALLOTS.length) {
            break;
        }
        round ++;
    }
    console.log(`------------- Final Result ------------`)

}



main().then(() =>{
    console.log(`Done!`);
});

