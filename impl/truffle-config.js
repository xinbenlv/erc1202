require(`dotenv`).config();

/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777", // Match any network id
      gas: 4e6,
      gasPrice: 2e5,
    },
    ropsten: {
      provider: function () {
        const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
        const privateKey = process.env.PRIVATE_KEY;
        console.assert(privateKey, 'Please set private key by `export PRIVATE_KEY=<your private key>`');
        const infuraApikey = process.env.INFURA_APIKEY;
        console.assert(infuraApikey, 'Please set private key by `export INFURA_APIKEY=<your infura API key>`');
        return new HDWalletProvider(privateKey, "https://ropsten.infura.io/"+infuraApikey);
      },
      network_id: 3,
      gas: 4e6,
      gasPrice: 2e10,
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      // version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
