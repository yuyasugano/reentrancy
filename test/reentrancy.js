var Reentrancy = artifacts.require("./Reentrancy.sol");
var Poker = artifacts.require("./Poker.sol");

contract('Reentrancy', function(accounts) {

  it("should put 1 ether in the first contract", async function () {
    let instance = await Reentrancy.deployed();
    let balance = await instance.getBalance.call();
    assert.equal(balance.valueOf(), web3.toWei(1, 'ether'), "1 ether wasn't in the first contract");
  });

  it("should have 10000 initial supply in the first account", async function () {
    var account = accounts[0];
    var initialSupply = 10000;

    let instance = await Reentrancy.deployed();
    let supply = await instance.balances(account);
    assert.equal(supply.valueOf(), initialSupply, "The total supply value was incorrect");
  });

  it("should be able to send token to the second account from the first account correctly", async function() {
    var amount = 5000;
    var account_one = accounts[0];
    var account_two = accounts[1];
    let instance = await Reentrancy.deployed();
    await instance.transfer(account_two, amount, {from: account_one});
    let balance = await instance.balances(account_two);
    assert.equal(balance.valueOf(), amount, "After transfer the token wasn't the correct value in the second contract");
  });
});

contract('Poker', function(accounts) {

  it("should put 1 ether in the first contract", async function () {
    let instance = await Poker.deployed();
    let balance = await instance.getBalance.call();
    assert.equal(balance.valueOf(), web3.toWei(1, 'ether'), "1 ether wasn't in the first contract");
  });

  it("withdraw ether by calling pull works correctly", function() {
    var token;
    var stack;
    var amount = 5000;
    var account = accounts[0];
    var reentrancyInstance;
    var pokerInstance;

    return Reentrancy.deployed().then(function(instance) {
      reentrancyInstance = instance;
      return Poker.deployed();
    }).then(function(instance) {
      pokerInstance = instance;
      reentrancyInstance.transfer(pokerInstance.address, amount, {from: account});
      return reentrancyInstance.balances(pokerInstance.address);
    }).then(function(supply) {
      token = supply.toNumber();
      pokerInstance.pull();
      return pokerInstance.getBalance.call();
    }).then(function(balance) {
      stack = balance.toNumber();
      assert.equal(token, amount, "After transfer the token wasn't the correct value");
      assert.equal(stack, web3.toWei(1, 'ether') + amount, "After calling pull, the balance wasn't the correct value");
    });
  });
});

