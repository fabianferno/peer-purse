// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;



interface IDai{
    function transfer(address dst, uint wad) external returns (bool) ;
}