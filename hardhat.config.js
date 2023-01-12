require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        url: "https://radial-fittest-asphalt.discover.quiknode.pro/02e8f4595e10f5a87bc9eb98c08239c0d848fde3/"
        
      }
    }
  }
};
