import { ethers } from "ethers";
import { POOL_ADDRESS, WSTETH_ABI, WSTETH_TOKEN_ADDRESS } from "../constants";

export default async function approve(provider: any, amount: string) {
  let contract = new ethers.Contract(
    WSTETH_TOKEN_ADDRESS,
    WSTETH_ABI,
    provider
  );

  let tx = await contract.approve(POOL_ADDRESS, amount);

  console.log(tx);

  return tx;
}
