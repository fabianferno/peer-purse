// SPDX-License-Identifier: MIT
// Solidity version declaration
pragma solidity ^0.8.10;

// Importing interfaces for other contracts
import "./interface/IPool.sol";
import "./interface/IDai.sol";

/// @title PeerPurse - A contract for managing accounts and supplying DAI with permits.
contract PeerPurse {

    /// @dev The address of the Pool contract.
    IPool public constant POOL_ADDRESS = IPool(0xe7EA57b22D5F496BF9Ca50a7830547b704Ecb91F);

    /// @dev The address of the DAI contract.
    IDai public constant DAI_ADDRESS = IDai(0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844);

    /// @dev The type hash for permit functions.
    bytes32 public constant PERMIT_TYPEHASH = 0xea2aa0a1be11a07ed86d755c93467f4f82362b452371d1ba94d1715123511acb;

    /// @dev The domain separator for permit functions.
    bytes32 public constant DOMAIN_SEPARATOR = 0x59acc7a861628c614a9f86b20338b69d53a8a74534cefcd49025da92d74d665d;

    /// @dev A mapping to check if an address is registered.
    mapping(address => bool) public isRegistered;

    /// @dev An array to store registered accounts.
    address[] public accounts;

    /// @dev Event to log the creation of an account.
    event AccountCreated(address indexed account, uint supplyAmount);


    /// @dev Function to supply DAI with a permit and register the account.
    /// @param aaWallet The address of the account.
    /// @param amount The amount of DAI to supply.
    /// @param signature The permit signature.
    function supplyAndRegister(address aaWallet, uint256 amount, bytes memory signature) public {
        (uint8 permitV, bytes32 permitR, bytes32 permitS) = splitSignature(signature);
        POOL_ADDRESS.supplyWithPermit(address(DAI_ADDRESS), amount, aaWallet, type(uint16).min, type(uint256).max, permitV, permitR, permitS);
        registerAccount(aaWallet);
        emit AccountCreated(aaWallet, amount);
    }

    /// @dev Function to register an account.
    /// @param aaWallet The address of the account to be registered.
    function registerAccount(address aaWallet) public {
        require(!isRegistered[aaWallet], "Already registered");
        accounts.push(aaWallet);
        isRegistered[aaWallet] = true;
    }

    /// @dev Function to get the permit digest.
    /// @param aaWallet The address of the account.
    /// @param amount The amount for the permit.
    /// @return The permit digest.
    function getDigest(address aaWallet, uint256 amount) public pure returns (bytes32) {
        return
            keccak256(abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
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