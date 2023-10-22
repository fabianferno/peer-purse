import { ethers } from "ethers";
import { DEBT_TOKEN_ABI, DEBT_TOKEN_ADDRESS } from "../constants";

export default async function approveDelegation(
  provider: any,
  delegatee: string,
  amount: any
) {
  let contract = new ethers.Contract(
    DEBT_TOKEN_ADDRESS,
    DEBT_TOKEN_ABI,
    provider
  );

  let tx = await contract.approveDelegation(delegatee, amount);

  console.log(tx);

  return "DONE";
}
