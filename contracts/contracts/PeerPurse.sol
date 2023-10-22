// SPDX-License-Identifier: MIT
// Solidity version declaration
pragma solidity ^0.8.10;

// Importing interfaces for other contracts
import "./interface/IPool.sol";
import "./interface/IDai.sol";
import "./interface/IDebtToken.sol";
/// @title PeerPurse - A contract for managing accounts and supplying DAI with permits.
contract PeerPurse {

    /// @dev The address of the Pool contract.
    IPool public constant POOL_ADDRESS = IPool(0x26ca51Af4506DE7a6f0785D20CD776081a05fF6d);

    /// @dev The address of the DAI contract.
    IDai public constant DAI_ADDRESS = IDai(0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844);

    IDebtToken public constant DEBT_ADDRESS=IDebtToken(0xD72630D78157E1a2feD7A329873Bfd496704403D);

    /// @dev The type hash for permit functions.
    bytes32 public constant PERMIT_TYPEHASH = 0xea2aa0a1be11a07ed86d755c93467f4f82362b452371d1ba94d1715123511acb;

    /// @dev The domain separator for permit functions.
    bytes32 public constant SUPPLY_DOMAIN_SEPARATOR = 0x59acc7a861628c614a9f86b20338b69d53a8a74534cefcd49025da92d74d665d;

    bytes32 public constant BORROW_DOMAIN_SEPERATOR=0x09a5cb2b302ba593afa9cc5194c32abadb5694634dbf3b6479e77c3c26e92266;

    bytes32 public constant DELEGATION_WITH_SIG_TYPEHASH =
    keccak256('DelegationWithSig(address delegatee,uint256 value,uint256 nonce,uint256 deadline)');

    /// @dev A mapping to check if an address is registered.
    mapping(address => bool) public isRegistered;

    /// @dev An array to store registered accounts.
    address[] public accounts;

    /// @dev Event to log the creation of an account.
    event AccountCreated(address account);
    event FundsBorrowed(address borrower, address lender,uint borrowAmount);


    /// @dev Function to register an account.
    /// @param aaWallet The address of the account to be registered.
    function registerAccount(address aaWallet) public {
        _registerAccount(aaWallet);
    }

    /// @dev Internal function to register an account.
    /// @param aaWallet The address of the account to be registered.
    function _registerAccount(address aaWallet) internal{
        require(!isRegistered[aaWallet], "Already registered");
        accounts.push(aaWallet);
        isRegistered[aaWallet] = true;
        emit AccountCreated(aaWallet);
    }



    function getDigestForBorrow(address delegator,address delegatee, uint256 amount) public view returns (bytes32) {
        uint256 currentValidNonce=DEBT_ADDRESS.nonces(delegator);
       return keccak256(
      abi.encodePacked(
        '\x19\x01',
        BORROW_DOMAIN_SEPERATOR,
        keccak256(
          abi.encode(DELEGATION_WITH_SIG_TYPEHASH, delegatee, amount, currentValidNonce, type(uint256).max)
        )
      )
    );
    }


    /// @dev Function to get the permit digest.
    /// @param aaWallet The address of the account.
    /// @param amount The amount for the permit.
    /// @return The permit digest.
    function getDigestForSupply(address aaWallet, uint256 amount) public pure returns (bytes32) {
        return
            keccak256(abi.encodePacked(
                "\x19\x01",
                SUPPLY_DOMAIN_SEPARATOR,
                keccak256(abi.encodePacked(PERMIT_TYPEHASH,
                    aaWallet,
                    POOL_ADDRESS,
                    amount,
                    type(uint256).max,
                    true))
            ));
    }

    /// @dev Function to split an Ethereum signature into its components (v, r, and s).
    /// @param signature The Ethereum signature.
    /// @return v The recovery id (v) component of the signature.
    /// @return r The r component of the signature.
    /// @return s The s component of the signature.
    function splitSignature(bytes memory signature) public pure returns (uint8 v, bytes32 r, bytes32 s) {
        require(signature.length == 65, "Invalid signature length");

        assembly {
            // Get the first byte of the signature (the recovery id 'v')
            v := byte(0, mload(add(signature, 32)))

            // 'r' and 's' are 32 bytes each, starting from byte 1 and byte 33
            r := mload(add(signature, 0x20))
            s := mload(add(signature, 0x40))
        }
    }

    /// @dev Function to get all registered accounts.
    /// @return The array of registered accounts.
    function getAllAccounts() public view returns (address[] memory) {
        return accounts;
    }
}