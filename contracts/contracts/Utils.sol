 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

 
contract Utils{

    address public constant POOL_ADDRESS = 0xe7EA57b22D5F496BF9Ca50a7830547b704Ecb91F;
    bytes32 public constant PERMIT_TYPEHASH = 0xea2aa0a1be11a07ed86d755c93467f4f82362b452371d1ba94d1715123511acb;
    bytes32 public constant DOMAIN_SEPARATOR =0x59acc7a861628c614a9f86b20338b69d53a8a74534cefcd49025da92d74d665d;
    function getDigest(uint256 amount)public view returns(bytes32){
          return
            keccak256(abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(abi.encodePacked(PERMIT_TYPEHASH,
                                     msg.sender,
                                     POOL_ADDRESS,
                                     amount,
                                     type(uint256).max,
                                     true))
                ));
    }



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
}
 
 
 
