//
// const JointWallet = artifacts.require("./v3/JointWallet.sol");
//
// const eq = assert.equal.bind(assert);
//
// contract("JointWallet", function(accounts) {
//   let jointWallet;
//   const user0 = accounts[0];
//   const user1 = accounts[1];
//   const user2 = accounts[2];
//
//   const user3 = accounts[3];
//   const user4 = accounts[4];
//   const user5 = accounts[5];
//
//   const deploy = async function () {
//     jointWallet = await JointWallet.new();
//     await jointWallet.initialize([user0, user1, user2]);
//     await jointWallet.sendTransaction({from: user0, value:1e19});
//     await jointWallet.addPayRequest(0, user3, 1e17, "Pay for the meal");
//     await jointWallet.addPayRequest(1, user4, 1e18, "Pay for the car");
//     await jointWallet.addPayRequest(2, user5, 8e18, "Pay for the house");
//   };
//
//   describe("behavior", function () {
//     beforeEach(deploy);
//
//     it("should be able to approve payments if unanimously approved", async function () {
//       // await jointWallet.vote(0, [1], {from: user0});
//       // await jointWallet.vote(0, [1], {from: user1});
//       // let ret = await jointWallet.vote(0, [1], {from: user2});
//       // let found = false;
//       // eq(ret.logs.length > 0, true, "We expect to see some event");
//       // for (let i = 0; i < ret.logs.length; i++) {
//       //   if (ret.logs[i].event === 'OnFinalized') {
//       //     found = true;
//       //     eq(ret.logs[i].args.winner, 1);
//       //     break;
//       //   }
//       // }
//       // eq(found, true);
//       //
//       // let ret1 = await jointWallet.issueApprovedPayment(0);
//       // eq(ret1.logs.length, 1);
//       // eq(ret1.logs[0].event, "OnPaid");
//       // let b = await web3.eth.getBalance(jointWallet.address);
//       // eq(b, 1e19 - 1e17);
//     });
//   });
// });
