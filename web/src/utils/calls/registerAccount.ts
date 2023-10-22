import { ethers } from "ethers";
import { PEER_PURSE_ABI, PEER_PURSE_ADDRESS } from "../constants";

export default async function registerAccount(provider: any, aaWallet: string) {
  let contract = new ethers.Contract(
    PEER_PURSE_ADDRESS,
    PEER_PURSE_ABI,
    provider
  );

  let tx = await contract.registerAccount(aaWallet);

  console.log(tx);

  return tx;
}
