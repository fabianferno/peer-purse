// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;



interface IDai{
    function transfer(address dst, uint wad) external returns (bool) ;

   function delegationWithSig(address delegator, address delegatee, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external;
}