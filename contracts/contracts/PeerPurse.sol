// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./Utils.sol";

contract PeerPurse{

    address public immutable i_dai;
    address public immutable i_pool;

    struct CreateLendOfferParams{
        uint amount;
    }

    struct LendFundsParams{
        uint amount;
    }

    struct BorrowFundsParams{
        uint amount;
    }


    constructor(address dai,address pool) {
        i_dai = dai;
        i_pool = pool;
    }



    
    function supplyAndRegister(uint256 amount) public {

        // Supply DAI to the pool and register your account in PeerPurse

    }


    function registerAccount() public{


    }


    function createLendOffer(CreateLendOfferParams memory params) public {

        // Create an offer in PeerPurse that you are open to lend money with anyone who can provide a valid zkProof

    }


    function lendFunds(uint256 amount) public {

        // 
        
    }

    function borrowFundsWithSignature(uint256 amount) public {
        
    }
}