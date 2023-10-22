import { ethers } from "ethers";
import { DAI_TOKEN_ADDRESS, POOL_ABI, POOL_ADDRESS } from "../constants";

export default async function supply(
  provider: any,
  aaWallet: string,
  amount: string
) {
  let contract = new ethers.Contract(POOL_ADDRESS, POOL_ABI, provider);

  let tx = await contract.supply(DAI_TOKEN_ADDRESS, amount, aaWallet, 0);

  console.log(tx);

  return "DONE";
}
