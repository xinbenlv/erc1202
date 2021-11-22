function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
function output(ballots) {
    ballots.map((ballot) => console.log(ballot));
}
let main_fake_data_gen = async () => {
    let smallTestConfig = {
        numOfDataSets: 10,
        maxVoterNum: 32, 
        maxCandidateNum: 8 
    }
    let config = smallTestConfig;
    for (let i = 0; i < config.numOfDataSets; i++) {
        let randVoterNum = Math.random() * config.maxVoterNum;
        let randCandidateNum = Math.random() * config.maxCandidateNum;
        let ballots = [];
        for (let v = 0; v < randVoterNum; v++) {
            let ballot = [];
            for (let c = 0; c < randCandidateNum; c++) {
                ballot[c] = c;
            }
            ballot = shuffle(ballot);
            ballots.push(ballot);
        }
        output(ballots);
    }
}

main_fake_data_gen().then(()=>{console.log(`Done!`)});