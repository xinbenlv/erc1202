import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy", "Deploy a single smart contract and verify")
  .addParam("contractName", "The name of smart contract to be deployed")
  .addOptionalParam("constructorArgs", "Optional arguments for constructor in the format of array of string")
  .setAction(async (taskArgs, hre) => {
    console.log(`Start deployment`);
    const WAIT_BLOCKS = 5;
    const contractName = taskArgs.contractName;
    // We get the contract to deploy
    await hre.run('compile');
    const contractArtifacts = await hre.ethers.getContractFactory(contractName);
    const constructorArgs = taskArgs.constructorArgs?.split(',') || [];
    console.log(`Deploying ${contractName} with params ${constructorArgs}...`);
    const contract = await contractArtifacts.deploy(...constructorArgs);
    console.log(`Done deploy`);
  
    await contract.deployed();
    console.log(`${contractName} deployed to: ${contract.address}`);
    for (let i = 0; i < WAIT_BLOCKS; i++) {
      await contract.deployTransaction.wait(i);
      console.log(`Waited for ${i}th blocks`);
    }
    await hre.run("verify:verify", {
      // other args
      address: contract.address,
      constructorArguments: constructorArgs,
    });
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default {
  solidity: "0.8.15",
  networks: {
    googsten: {
      url: "http://localhost:8888",
      accounts: {
        // WARNING The following is a TEST ONLY mnemonic from truffle. DO NOT use it in production.
        mnemonic: "uphold wisdom ready try dinner resemble capable soda surge rebel speak tree",
      }
    },
    ropsten: {
      url: process.env.ROPSTEN_URL,
      accounts: {
        mnemonic: process.env.MNEMONIC_SECRET,
      }
    },
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: {
        mnemonic: process.env.MNEMONIC_SECRET,
      }
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_KEY
  }
};
