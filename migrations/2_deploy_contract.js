var ReentrancyContract = artifacts.require("./Reentrancy.sol");
var PokerContract = artifacts.require("./Poker.sol");

module.exports = function(deployer) {
  var initialSupply = 10000;
  deployer.then(async function () {
    await deployer.deploy(ReentrancyContract, initialSupply, {from:web3.eth.accounts[0], value:1000000000000000000});
    return deployer.deploy(PokerContract, ReentrancyContract.address, {from:web3.eth.accounts[0], value:1000000000000000000});
  });
}

