import { ethers } from "ethers";
import { DAI_TOKEN_ADDRESS, POOL_ABI, POOL_ADDRESS } from "../constants";

export default async function borrow(
  provider: any,
  delegator: string,
  aaWallet: string,
  amount: any
) {
  let contract = new ethers.Contract(POOL_ADDRESS, POOL_ABI, provider);

  console.log("borrowing: ", aaWallet, amount);

  let tx = await contract.borrow(DAI_TOKEN_ADDRESS, amount, 2, 0, delegator);

  console.log(tx);

  return tx;
}
