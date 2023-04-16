const CoinFlipGame = artifacts.require("CoinFlipGame");

module.exports = function (deployer) {
  deployer.deploy(CoinFlipGame);
};
