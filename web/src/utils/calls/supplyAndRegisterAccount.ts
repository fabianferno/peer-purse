import { ethers } from "ethers";
import { PEER_PURSE_ABI, PEER_PURSE_ADDRESS } from "../constants";

export default async function supplyAndRegisterAccount(
  provider: any,
  aaWallet: string,
  amount: string,
  sig: string
) {
  let contract = new ethers.Contract(
    PEER_PURSE_ADDRESS,
    PEER_PURSE_ABI,
    provider
  );

  let tx = await contract.supplyAndRegister(aaWallet, amount, sig);

  console.log(tx);

  return "DONE";
}
