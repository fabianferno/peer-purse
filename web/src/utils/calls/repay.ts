import { ethers } from "ethers";
import { DAI_TOKEN_ADDRESS, POOL_ABI, POOL_ADDRESS } from "../constants";

export default async function repay(
  provider: any,
  aaWallet: string,
  amount: string
) {
  let contract = new ethers.Contract(POOL_ADDRESS, POOL_ABI, provider);

  let tx = await contract.repay(DAI_TOKEN_ADDRESS, amount, 1, aaWallet);

  console.log(tx);

  return "DONE";
}
