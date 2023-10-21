require("@nomicfoundation/hardhat-toolbox");
require("hardhat-contract-sizer");
require("@openzeppelin/hardhat-upgrades");
require("./tasks");
require("dotenv").config();

// Enable gas reporting (optional)
const REPORT_GAS =
  process.env.REPORT_GAS?.toLowerCase() === "true" ? true : false;

const SOLC_SETTINGS = {
  optimizer: {
    enabled: true,
    runs: 1000,
  },
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 15,
            details: { yul: false },
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      accounts: process.env.PRIVATE_KEY
        ? [
            {
              privateKey: process.env.PRIVATE_KEY,
              balance: "10000000000000000000000",
            },
          ]
        : [],
    },
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      chainId: 5,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      nativeCurrencySymbol: "ETH",
    },
  },
  etherscan: {
    // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    // to get exact network names: npx hardhat verify --list-networks
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
  },
  contractSizer: {
    runOnCompile: false,
    only: [],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./build/cache",
    artifacts: "./build/artifacts",
  },

  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
};
