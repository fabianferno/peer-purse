import { ethers } from "ethers";
import { PEER_PURSE_ABI, PEER_PURSE_ADDRESS } from "../constants";

export default async function getDigest(provider: any, sig: string) {
  let contract = new ethers.Contract(
    PEER_PURSE_ADDRESS,
    PEER_PURSE_ABI,
    provider
  );

  let splitSig = await contract.splitSignature(sig);

  console.log(splitSig);

  return splitSig;
}
