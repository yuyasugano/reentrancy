# Reentrancy
A demo solidity and test codes to simulate reentrancy bug in a smart contract.

# Requirements
The code is written in solidity version 0.4.23 and the test uses async/await functions.
You may need node version above 7.6 to run those functions.

Here's information of workable environment.

node --version
v10.13.0

npm --version
6.4.1

## Contracts
`Reentrancy` contract is prone to reentrancy bug in the `withdraw()` function that is using low-level function call to transfer ether to an address. `Poker` contract has a `pull()` function to call `withdraw()` function and fallback function that calls `withdraw()` function again recursively. Once the `pull()` function is executed then it causes executions of `withdraw()` function up to 20 times even the token balance does not have sufficient amount. As a result the `Poker` contract address can withdraw ether more than the balance.

## To Migrate:
1. Run: `truffle develop` under the application root
2. In the development console run: `compile`
3. Next run: `migrate` or (`migrate --reset`)

## To Test:
1. Migrate the contracts in the truffle development blockchain
2. `truffle test` or `test` in the truffle development console
